const { Client, Intents } = require('discord.js');
require("dotenv").config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === '기모띠') {
        await interaction.reply('앙기모띠!');
    }
});

client.login(process.env.BOT_TOKEN)