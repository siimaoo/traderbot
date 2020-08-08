import { Message } from "discord.js";
import { GenerateMessage } from "../utils/GenerateMessage";

export class RemoveCommand {
  constructor(
    private ativos: Array<string>,
    private generateMessage = new GenerateMessage()
  ) {}

  public execute(params: Array<string>, msg: Message) {
    params.map((param) => {
      if (this.ativos.includes(param.toUpperCase())) {
        const index = this.ativos.indexOf(param.toUpperCase());
        this.ativos.splice(index, 1);
      }
    });
  
    let content = [];

    this.ativos.map((ativo) => {
      content.push({ name: "Nome do ativo", value: ativo });
    });
  
    return msg.author.createDM().then((author) => {
      author.send(
        this.generateMessage.execute(
          "#28fc03",
          "Ativo removido com sucesso! \n Nova lista de ativos:",
          content
        )
      );
    });
  }
}