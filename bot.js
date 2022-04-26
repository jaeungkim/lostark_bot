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

client.on('messageCreate', (message) => {
    if (message.content === '기모띠') {
        message.reply({
            content: '앙',
        })
    }
})

client.login(process.env.BOT_TOKEN)