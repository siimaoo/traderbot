import { Client, Message } from 'discord.js';
import {ListCommand} from './commands/ListCommand';
import 'dotenv/config';

import { IBotRepository } from './repositories/IBotRepository';
import { SetActivity } from './utils/SetActivity';
import { HelpCommand } from './commands/HelpCommand';
import { AddCommand } from './commands/AddCommand';
import { RemoveCommand } from './commands/RemoveCommand';

class TraderBot {
  private botToken: string = process.env.TOKEN;
  private client = new Client();
  private ativos: Array<string> = [];
  private setActivity = new SetActivity(this.client);
  private listCommand = new ListCommand(this.ativos);
  private helpCommand = new HelpCommand();
  private addCommand = new AddCommand(this.ativos);
  private removeCommand = new RemoveCommand(this.ativos);
  
  constructor() {
    this.init();
  }
  
  private init() {
    this.client.login(this.botToken);
    this.client.on("ready", () => {
      this.setActivity.execute();
    });

    this.client.on("message", (msg) => {
      const commandAndParams = msg.content.split(" ");
      const [command, action, ...params] = commandAndParams;

      if (command == "/tb") this.listCommands(action, params, msg);
    })
  }

  private listCommands(action: string, params: string[], msg: Message) : void {
    const commands = {
      add: () => this.addCommand.execute(params, msg),
      remove: () => this.removeCommand.execute(params, msg),
      list: () => this.listCommand.execute(msg),
      help: () => this.helpCommand.execute(msg)
    };

    return commands[action] != undefined ? commands[action]() : commands['help'](); 
  }
}

export default new TraderBot();