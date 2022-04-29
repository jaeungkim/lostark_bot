
const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
require('dotenv').config()

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

console.log(client.commands);

client.once('ready', async () => {
    console.log('Ready!');
});

// client.on('ready', function () {
//     client.user.setActivity(config.activity, { type: config.activityType });
// });

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
        await message.guild.commands
            .set(client.commands)
            .then(() => {
                message.reply('Deployed!');
            })
            .catch(err => {
                message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
                console.error(err);
            });
    }
});


client.on('interactionCreate', async interaction => {
    console.log('ok')
    const command = client.commands.get(interaction.commandName.toLowerCase());

    try {
        if (interaction.commandName == 'party' || interaction.commandName == 'userinfo') {
            command.execute(interaction, client);
        }
    } catch (error) {
        console.error(error);
        interaction.followUp({
            content: 'There was an error trying to execute that command!',
        });
    }
});

client.login(process.env.BOT_TOKEN);