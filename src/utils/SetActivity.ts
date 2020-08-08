import { Client } from "discord.js";

export class SetActivity {
  constructor(
    private client: Client
  ){}

  public execute() {
    this.client.user.setActivity(
      "Digita 'tb /help' em algum canal ai pra tu ver o que eu faço"
    );
  }
}