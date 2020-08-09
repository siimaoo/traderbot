import { Client, Message } from 'discord.js';
import {ListCommand} from './commands/ListCommand';
import 'dotenv/config';

import { SetActivity } from './utils/SetActivity';
import { HelpCommand } from './commands/HelpCommand';
import { AddCommand } from './commands/AddCommand';
import { RemoveCommand } from './commands/RemoveCommand';
import { GetStockPrice } from './services/GetStockPrice';
import { SendMessageOnChannel } from './utils/SendMessageOnChannel'; 

class TraderBot {
  private botToken: string = process.env.TOKEN;
  private client = new Client();
  private ativos: Array<string> = [];
  private setActivity = new SetActivity(this.client);
  private listCommand = new ListCommand(this.ativos);
  private helpCommand = new HelpCommand();
  private addCommand = new AddCommand(this.ativos);
  private removeCommand = new RemoveCommand(this.ativos);
  private getStockPrice = new GetStockPrice(this.ativos, this.client);
  
  constructor() {
    this.init();
  }
  
  private init() {
    this.client.login(this.botToken);

    this.client.on("ready", () => {
      console.log('Start: success');
      this.setActivity.execute();
      console.log('Set Activity: success');
      this.getStockPrice.execute();
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