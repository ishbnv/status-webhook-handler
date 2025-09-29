export interface WebhookRequest {
  sub1?: string;
  sub2?: string;
  sub6?: string;
  status?: string;
  offerName?: string;
}

export type Stage = 'in_progress' | 'approved' | 'declined' | 'click';

export interface BotConfig {
  pattern: RegExp;
  handler: 'targethunter' | 'senler';
  channel: 'TG' | 'VK';
  tokens: {
    groupId: string;
    botId?: string;
  };
  messages: {
    in_progress?: string;
    approved?: string;
    declined?: string;
    click?: string;
  };
  variables: {
    offerName?: string;
    stage?: string;
  };
}