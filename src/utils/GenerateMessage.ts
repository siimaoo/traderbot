import { MessageEmbed } from "discord.js";

export class GenerateMessage {
  public execute(color: string, desc: string, content: any): any {
    return new MessageEmbed()
      .setColor(color)
      .setTitle("Trader Bot")
      .setDescription(desc)
      .addFields(content)
      .setTimestamp()
      .setFooter("Criado por: Lucas Simão");
  }
}