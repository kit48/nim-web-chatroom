import { GetInstanceOptions, Message } from './interface';

export default class Chatroom {
  static getInstance(options: GetInstanceOptions) {}

  constructor(options: GetInstanceOptions);

  disconnect();
}
