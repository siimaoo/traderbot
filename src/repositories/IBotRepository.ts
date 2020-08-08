import { DMChannel, MessageEmbed, Message } from 'discord.js';

export interface IBotRepository {
  init() : void;
  listCommands(action: string, params: string[], msg: Message) : void;
}