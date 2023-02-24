const { Client, Collection, GatewayIntentBits } = require("discord.js");

module.exports = class extends Client {
  constructor(config) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
      ],
    });

    this.commands = new Collection();

    this.config = config;
  }
};
