import type { Request, Response } from 'express';
import type { WebhookRequest, Stage, BotConfig } from './types.js';
import { BOTS } from './config/bots.js';
import { sendRequest } from './utils/http.js';
import { log } from './utils/logger.js';

const STAGE_MAP: Record<string, Stage> = {
  '0': 'in_progress',
  '1': 'approved',
  '2': 'declined',
  '3': 'click',
};

/**
 * Обработчик входящих webhook запросов от CPA-сети
 * 
 * Принимает данные о конверсиях, парсит их и синхронизирует со всеми подходящими ботами (Telegram/VK) через внешние API
 * 
 * @param {Request} req - Express request объект с данными webhook
 * @param {Response} res - Express response объект для отправки ответа
 * @returns {Promise<void>}
 * 
 * @example
 * // POST /webhook
 * {
 *   "sub1": "nalikov",
 *   "sub2": "tg",
 *   "sub6": "123456",
 *   "status": "1",
 *   "offerName": "Наличка - быстрый займ"
 * }
 */
export async function handleWebhook(req: Request, res: Response) {
  try {
    const data: WebhookRequest = req.body;
    
    log('request.txt', data);
    log('debug_payload.log', { timestamp: new Date(), raw: req.body });

    const userId = data.sub6;
    const status = data.status;
    const sub1 = data.sub1 || '';
    const sub2 = data.sub2 || '';
    const stage: Stage = STAGE_MAP[status || ''] || 'in_progress';
    
    const offerNameRaw = data.offerName || '';
    const offerName = offerNameRaw.split(' - ')[0].trim();

    if (!userId) {
      return res.status(400).json({ error: 'user_id (sub6) is required' });
    }

    const matchedBots = BOTS.filter(bot => {

      if (bot.channel === 'TG') {
        return bot.pattern.test(sub2);
      }

      return bot.pattern.test(sub1);
    });

    const promises = matchedBots.map(bot => syncBot(bot, userId, stage, offerName));
    await Promise.allSettled(promises);

    res.json({ success: true, synced: matchedBots.length });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function syncBot(bot: BotConfig, userId: string, stage: Stage, offerName: string) {
  const messageId = bot.messages[stage];
  
  if (!messageId) {
    console.log(`No message configured for stage ${stage} in bot`);
    return;
  }

  try {
    if (bot.handler === 'targethunter') {
      await syncTargetHunter(bot, userId, stage, messageId, offerName);
    } else if (bot.handler === 'senler') {
      await syncSenler(bot, userId, messageId, offerName);
    }
  } catch (error) {
    console.error(`Failed to sync bot ${bot.tokens.groupId}:`, error);
  }
}

/**
 * Синхронизирует данные через Targethunter API
 * 
 * Выполняет три операции:
 * 1. Отправляет пользователя на нужный шаг чатбота
 * 2. Устанавливает переменную с названием оффера (при наличии)
 * 3. Устанавливает переменную со стадией конверсии (при наличии переменной)
 * 
 * @param {BotConfig} bot - Конфигурация бота
 * @param {string} userId - ID пользователя BotHunter
 * @param {string} offerName - Название оффера
 * @param {string} messageId - ID сообщения/шага в BotHunter
 * @param {Stage} stage - Текущий этап конверсии
 * @returns {Promise<void>}
 * @throws {Error} Если запрос к API не выполнен
 */
async function syncTargetHunter(
  bot: BotConfig,
  userId: string,
  stage: Stage,
  messageId: string,
  offerName: string
): Promise<void> {

  if (bot.variables.offerName) {
    await sendRequest('https://smm.targethunter.ru/api/vars/set', {
      group_id: bot.tokens.groupId,
      api_key: process.env.API_KEY,
      var_id: bot.variables.offerName,
      uid: parseInt(userId),
      channel: bot.channel,
      value: offerName,
    });
  }

  if (bot.variables.stage) {
    await sendRequest('https://smm.targethunter.ru/api/vars/set', {
      group_id: bot.tokens.groupId,
      api_key: process.env.API_KEY,
      var_id: bot.variables.stage,
      uid: parseInt(userId),
      channel: bot.channel,
      value: stage,
    });
  }

  await sendRequest('https://smm.targethunter.ru/api/bots/addUser', {
    group_id: bot.tokens.groupId,
    api_key: process.env.API_KEY,
    bot_id: bot.tokens.botId,
    uid: parseInt(userId),
    channel: bot.channel,
    step_id: messageId,
    force: 1,
  });
}

/**
 * Синхронизирует данные через Senler API VK
 * 
 * Выполняет две операции:
 * 1. Добавляет пользователя в группу подписчиков (на нужный шаг чатбота)
 * 2. Устанавливает переменную с названием оффера (при наличии)
 * 
 * @param {BotConfig} bot - Конфигурация бота
 * @param {string} userId - ID пользователя VK
 * @param {string} offerName - Название оффера
 * @param {string} messageId - ID группы подписчиков в Senler
 * @returns {Promise<void>}
 * @throws {Error} Если запрос к API не выполнен
 */
async function syncSenler(
  bot: BotConfig,
  userId: string,
  messageId: string,
  offerName: string
) {

  if (bot.variables.offerName) {
    await sendRequest('https://senler.ru/api/vars/set', {
      vk_group_id: bot.tokens.groupId,
      access_token: process.env.VK_PCHELKAZAIM_BOT_TOKEN,
      v: 2,
      vk_user_id: parseInt(userId),
      name: bot.variables.offerName,
      value: offerName,
    });
  }

  await sendRequest('https://senler.ru/api/subscribers/add', {
    vk_group_id: bot.tokens.groupId,
    access_token: process.env.VK_PCHELKAZAIM_BOT_TOKEN,
    v: 2,
    vk_user_id: parseInt(userId),
    subscription_id: messageId,
  });
}