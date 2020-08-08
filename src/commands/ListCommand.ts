import { Message } from "discord.js";
import { GenerateMessage } from '../utils/GenerateMessage';

export class ListCommand {
  constructor(
    private ativos: Array<string>,
    private generateMessage = new GenerateMessage()
  ) {}

  public execute(msg: Message) : void {
    msg.author.createDM().then((author) => {
      let content = [];

      this.ativos.map((ativo) => {
        content.push({ name: "Nome do ativo", value: ativo });
      });

      author.send(this.generateMessage.execute("#0099ff", "Lista de ativos", content));
    });
  }
}