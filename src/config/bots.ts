import type { BotConfig } from '../types';

export const BOTS: BotConfig[] = [
  // Telegram боты
  {
    pattern: /tg/i,
    handler: 'targethunter',
    channel: 'TG',
    tokens: {
      groupId: process.env.TG_BOT_TOKEN!,
      botId: process.env.TG_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.TG_MSG_IN_PROGRESS,
      approved: process.env.TG_MSG_APPROVED,
      declined: process.env.TG_MSG_DECLINED,
    },
    variables: {
      offerName: process.env.TG_VAR_OFFERNAME,
    },
  },
  {
    pattern: /tg/i,
    handler: 'targethunter',
    channel: 'TG',
    tokens: {
      groupId: process.env.TG2_BOT_TOKEN!,
      botId: process.env.TG2_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.TG2_MSG_IN_PROGRESS,
      approved: process.env.TG2_MSG_APPROVED,
      declined: process.env.TG2_MSG_DECLINED,
    },
    variables: {
      offerName: process.env.TG2_VAR_OFFERNAME,
    },
  },

  // VK - Народный Займ
  {
    pattern: /.*/,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_BOT_TOKEN!,
      botId: process.env.VK_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_MSG_IN_PROGRESS,
      approved: process.env.VK_MSG_APPROVED,
      declined: process.env.VK_MSG_DECLINED,
      click: process.env.VK_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_VAR_OFFERNAME,
      stage: process.env.VK_VAR_STAGE,
    },
  },

  // VK - Наликов
  {
    pattern: /nalikov/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_NALIKOV_BOT_TOKEN!,
      botId: process.env.VK_NALIKOV_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_NALIKOV_MSG_IN_PROGRESS,
      approved: process.env.VK_NALIKOV_MSG_APPROVED,
      declined: process.env.VK_NALIKOV_MSG_DECLINED,
    },
    variables: {
      offerName: process.env.VK_NALIKOV_VAR_OFFERNAME,
    },
  },

  // VK - Наличкин
  {
    pattern: /nalickin/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_NALICKINRF_BOT_TOKEN!,
      botId: process.env.VK_NALICKINRF_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_NALICKINRF_MSG_IN_PROGRESS,
      approved: process.env.VK_NALICKINRF_MSG_APPROVED,
      declined: process.env.VK_NALICKINRF_MSG_DECLINED,
      click: process.env.VK_NALICKINRF_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_NALICKINRF_VAR_OFFERNAME,
    },
  },

  // VK - Кубышка
  {
    pattern: /kubyshka/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_KUBYSHKA_BOT_TOKEN!,
      botId: process.env.VK_KUBYSHKA_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_KUBYSHKA_MSG_IN_PROGRESS,
      approved: process.env.VK_KUBYSHKA_MSG_APPROVED,
      declined: process.env.VK_KUBYSHKA_MSG_DECLINED,
      click: process.env.VK_KUBYSHKA_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_KUBYSHKA_VAR_OFFERNAME,
    },
  },

  // VK - Каракоз
  {
    pattern: /karakoz/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_KARAKOZ_BOT_TOKEN!,
      botId: process.env.VK_KARAKOZ_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_KARAKOZ_MSG_IN_PROGRESS,
      approved: process.env.VK_KARAKOZ_MSG_APPROVED,
      declined: process.env.VK_KARAKOZ_MSG_DECLINED,
      click: process.env.VK_KARAKOZ_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_KARAKOZ_VAR_OFFERNAME,
    },
  },

  // VK - Займ до ЗП
  {
    pattern: /zaymdozp/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_ZAYMDOZP_BOT_TOKEN!,
      botId: process.env.VK_ZAYMDOZP_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_ZAYMDOZP_MSG_IN_PROGRESS,
      approved: process.env.VK_ZAYMDOZP_MSG_APPROVED,
      declined: process.env.VK_ZAYMDOZP_MSG_DECLINED,
      click: process.env.VK_ZAYMDOZP_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_ZAYMDOZP_VAR_OFFERNAME,
    },
  },

  // VK - Кролик
  {
    pattern: /krolik/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_KROLIK_BOT_TOKEN!,
      botId: process.env.VK_KROLIK_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_KROLIK_MSG_IN_PROGRESS,
      approved: process.env.VK_KROLIK_MSG_APPROVED,
      declined: process.env.VK_KROLIK_MSG_DECLINED,
      click: process.env.VK_KROLIK_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_KROLIK_VAR_OFFERNAME,
    },
  },

  // VK - Пчелка Займ (Senler)
  {
    pattern: /pchelkazaim/i,
    handler: 'senler',
    channel: 'VK',
    tokens: {
      groupId: '188856241',
    },
    messages: {
      in_progress: '3316958',
      approved: '3316962',
      declined: '3316959',
      click: '3364545',
    },
    variables: {
      offerName: 'offer_name',
    },
  },

  // VK - Monzi
  {
    pattern: /monzi/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_MONZI_BOT_TOKEN!,
      botId: process.env.VK_MONZI_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_MONZI_MSG_IN_PROGRESS,
      approved: process.env.VK_MONZI_MSG_APPROVED,
      declined: process.env.VK_MONZI_MSG_DECLINED,
    },
    variables: {
      offerName: process.env.VK_MONZI_VAR_OFFERNAME,
    },
  },

  // VK - Карась
  {
    pattern: /karas/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_KARAS_BOT_TOKEN!,
      botId: process.env.VK_KARAS_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_KARAS_MSG_IN_PROGRESS,
      approved: process.env.VK_KARAS_MSG_APPROVED,
      declined: process.env.VK_KARAS_MSG_DECLINED,
      click: process.env.VK_KARAS_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_KARAS_VAR_OFFERNAME,
    },
  },

  // VK - Ultra
  {
    pattern: /ultra-bank/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_ULTRA_BOT_TOKEN!,
      botId: process.env.VK_ULTRA_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_ULTRA_MSG_IN_PROGRESS,
      approved: process.env.VK_ULTRA_MSG_APPROVED,
      declined: process.env.VK_ULTRA_MSG_DECLINED,
    },
    variables: {
      offerName: process.env.VK_ULTRA_VAR_OFFERNAME,
    },
  },

  // VK - Крокo Займ
  {
    pattern: /kroko/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_CROC_BOT_TOKEN!,
      botId: process.env.VK_CROC_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_CROC_MSG_IN_PROGRESS,
      approved: process.env.VK_CROC_MSG_APPROVED,
      declined: process.env.VK_CROC_MSG_DECLINED,
      click: process.env.VK_CROC_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_CROC_VAR_OFFERNAME,
    },
  },

  // VK - 50 МОНЕТ
  {
    pattern: /50monetru/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_MONET_BOT_TOKEN!,
      botId: process.env.VK_MONET_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_MONET_MSG_IN_PROGRESS,
      approved: process.env.VK_MONET_MSG_APPROVED,
      declined: process.env.VK_MONET_MSG_DECLINED,
      click: process.env.VK_MONET_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_MONET_VAR_OFFERNAME,
    },
  },

  // VK - Зарплаткин
  {
    pattern: /zarplatkinrf/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_ZARPLATKIN_BOT_TOKEN!,
      botId: process.env.VK_ZARPLATKIN_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_ZARPLATKIN_MSG_IN_PROGRESS,
      approved: process.env.VK_ZARPLATKIN_MSG_APPROVED,
      declined: process.env.VK_ZARPLATKIN_MSG_DECLINED,
      click: process.env.VK_ZARPLATKIN_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_ZARPLATKIN_VAR_OFFERNAME,
    },
  },

  // VK - Kopilich
  {
    pattern: /kopilich/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_KOPILICH_BOT_TOKEN!,
      botId: process.env.VK_KOPILICH_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_KOPILICH_MSG_IN_PROGRESS,
      approved: process.env.VK_KOPILICH_MSG_APPROVED,
      declined: process.env.VK_KOPILICH_MSG_DECLINED,
      click: process.env.VK_KOPILICH_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_KOPILICH_VAR_OFFERNAME,
    },
  },

  // VK - Finkit
  {
    pattern: /finkit/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_FINKIT_BOT_TOKEN!,
      botId: process.env.VK_FINKIT_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_FINKIT_MSG_IN_PROGRESS,
      approved: process.env.VK_FINKIT_MSG_APPROVED,
      declined: process.env.VK_FINKIT_MSG_DECLINED,
      click: process.env.VK_FINKIT_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_FINKIT_VAR_OFFERNAME,
    },
  },

  // VK - Фонд
  {
    pattern: /fond/i,
    handler: 'targethunter',
    channel: 'VK',
    tokens: {
      groupId: process.env.VK_FINKIT_BOT_TOKEN!,
      botId: process.env.VK_FINKIT_TRUE_BOT_TOKEN!,
    },
    messages: {
      in_progress: process.env.VK_FINKIT_MSG_IN_PROGRESS,
      approved: process.env.VK_FINKIT_MSG_APPROVED,
      declined: process.env.VK_FINKIT_MSG_DECLINED,
      click: process.env.VK_FINKIT_MSG_CLICK,
    },
    variables: {
      offerName: process.env.VK_FINKIT_VAR_OFFERNAME,
    },
  },
];