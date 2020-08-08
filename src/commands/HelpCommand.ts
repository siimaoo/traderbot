import { Message } from "discord.js";
import { GenerateMessage } from '../utils/GenerateMessage';

export class HelpCommand {
  constructor(
    private generateMessage = new GenerateMessage()
  ){}

  public execute(msg: Message) : void {
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

      author.send(this.generateMessage.execute("#fc0328", "Comandos", content));
    });
  }
}