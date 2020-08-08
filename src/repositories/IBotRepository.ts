import { DMChannel, MessageEmbed, Message } from 'discord.js';

export interface IBotRepository {
  init() : void;
  listCommands(action: string, params: string[], msg: Message) : void;
  getChannelId() : string | boolean;
  notifyChannel() : void;
  add(params: string[], msg: Message) : void;
  remove(params: string[], msg: Message) : void;
  list(msg: Message) : void;
  help(msg: Message) : void;
  generateMessage(color: string, desc: string, content: any) : Promise<MessageEmbed>;
}