import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
})

client.on('messageCreate', (message) => {
    if (message.content === '기모띠') {
        message.reply({
            content: '앙',
        })
    }
})

client.login(process.env.BOT_TOKEN)