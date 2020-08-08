import { Message } from "discord.js";
import { GenerateMessage } from "../utils/GenerateMessage";

export class AddCommand {
  constructor(
    private ativos: Array<string>,
    private generateMessage = new GenerateMessage()
  ) {}

  public execute(params: Array<string>, msg: Message) {
    if (this.ativos.length > 4) {
      return msg.author.createDM().then((author) => {
        author.send(
          this.generateMessage.execute(
            "#fc0328",
            "Ocorreu um erro!",
            {name: "Maximo de ativos atingido!", value: 'Infelizmente não é possivel adicionar mais de 5 ativos!'}
          )
        );
      });
    }
  
    params.map((param) => {
      if (!this.ativos.includes(param)) {
        this.ativos.push(param.toUpperCase());
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
          "Ativo adicionado com sucesso! \n Nova lista de ativos:",
          content
        )
      );
    });
  }
}