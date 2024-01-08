type ChatGptAgent = 'user' | 'system';

export const RoleService = {
  USER: 'user',
  SYSTEM: 'system',
};

export interface ChatGptMessage {
  role: ChatGptAgent;
  message: string;
}
