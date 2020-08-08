import { Client, Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import cron from 'node-cron';
import 'dotenv/config';

import { IBotRepository } from './repositories/IBotRepository';

class TraderBot implements IBotRepository {
  private botToken: string = process.env.TOKEN;
  private client = new Client();
  private channelToNotify: string = "";
  private ativos: Array<string> = [];
  
  constructor() {
    this.init();
  }
  
  private init() {
    this.client.login(this.botToken);
    this.client.on("ready", () => {
      this.setActivity();
    });

    this.client.on("message", (msg) => {
      const commandAndParams = msg.content.split(" ");
      const [command, action, ...params] = commandAndParams;

      if (command == "/tb") this.listCommands(action, params, msg);
    })
  }

  private listCommands(action: string, params: string[], msg: Message) : void {
    const commands = {
      add: () => this.add(params, msg),
      remove: () => this.remove(params, msg),
      list: () => this.list(msg),
      help: () => this.help(msg)
    };

    return commands[action] != undefined ? commands[action]() : commands['help'](); 
  }

  private help(msg: Message) : void {
    msg.author.createDM().then((author) => {
      const content = [
        {
          name: "/tb help",
          value: "Lista os comandos",
        },
        {
          name: "/tb add NOME_DE_UM_ATIVO",
          value: "Adiciona um ativo a lista de notificações",
        },
        {
          name: "/tb remove NOME_DE_UM_ATIVO",
          value: "Remove um ativo da lista de notificações",
        },
        {
          name: "/tb list",
          value: "Mostra a atual lista de ativos",
        },
      ];

      author.send(this.generateMessage("#fc0328", "Comandos", content));
    });
  }

  private list(msg: Message) : void {
    console.log(1);
    msg.author.createDM().then((author) => {
      let content = [];

      this.ativos.map((ativo) => {
        content.push({ name: "Nome do ativo", value: ativo });
      });

      author.send(this.generateMessage("#0099ff", "Lista de ativos", content));
    });
  }

  private generateMessage(color: string, desc: string, content: any): any {
    return new MessageEmbed()
      .setColor(color)
      .setTitle("Trader Bot")
      .setDescription(desc)
      .addFields(content)
      .setTimestamp()
      .setFooter("Criado por: Lucas Simão");
  }

  private setActivity() {
    this.client.user.setActivity(
      "Digita 'tb /help' em algum canal ai pra tu ver o que eu faço"
    );
  }
}

export default new TraderBot();