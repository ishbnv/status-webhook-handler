import type { BotConfig } from '../types';

export const BOTS: BotConfig[] = [
  // VK - Лавка Займов
  {
    pattern: /vkzaim/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_LAVKA_BOT_TOKEN!,
      botId: process.env.VK_LAVKA_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_LAVKA_MSG_IN_PROGRESS,
      approved: process.env.VK_LAVKA_MSG_APPROVED,
      declined: process.env.VK_LAVKA_MSG_DECLINED,
      click: process.env.VK_LAVKA_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_LAVKA_VAR_OFFERNAME,
    },
  },

  // VK - Кокос
  {
    pattern: /kokos/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_COCONUT_BOT_TOKEN!,
      botId: process.env.VK_COCONUT_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_COCONUT_MSG_IN_PROGRESS,
      approved: process.env.VK_COCONUT_MSG_APPROVED,
      declined: process.env.VK_COCONUT_MSG_DECLINED,
      click: process.env.VK_COCONUT_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_COCONUT_VAR_OFFERNAME,
    },
  },

  // VK - Кошелькович
  {
    pattern: /kosel/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_KOSHELKOVICH_BOT_TOKEN!,
      botId: process.env.VK_KOSHELKOVICH_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_KOSHELKOVICH_MSG_IN_PROGRESS,
      approved: process.env.VK_KOSHELKOVICH_MSG_APPROVED,
      declined: process.env.VK_KOSHELKOVICH_MSG_DECLINED,
      click: process.env.VK_KOSHELKOVICH_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_KOSHELKOVICH_VAR_OFFERNAME,
    },
  },

];