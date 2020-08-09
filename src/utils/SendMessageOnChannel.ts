import { Client, Guild } from "discord.js";

export class SendMessageOnChannel {
  constructor(
  ) {}

  public execute(client: Client, message: any) {
    let server: Guild;
    let channelToNotify: any

    

    client.guilds.cache.map((guild) => {
      if (guild.name == "siimaoo's server")
        server = guild;
    });

    server.channels.cache.map((channel) => {
      if (channel.name == "teste-bot")
        channelToNotify = channel;
    });

    

    channelToNotify.send(message);
  }
}