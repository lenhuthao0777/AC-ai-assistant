import Base from '../base';

class ChatService extends Base {
  endpoint = 'chat';

  chat(messages: any) {
    return this.post(this.endpoint, { messages }).then((res) => res.data);
  }
}

export default ChatService;
