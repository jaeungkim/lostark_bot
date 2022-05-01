const { Client, Collection, Intents } = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            ],
        });

        this.commands = new Collection();

        this.config = config;
    }
};