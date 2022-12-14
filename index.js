const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
const fs = require('node:fs');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Client = require('./client/Client');
const client = new Client();
const clientId = '968623822037205032'; //올스타
const guildId = '937590271930163200'; //올스타

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: client.commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();


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

// console.log(client.commands);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    try {
        if (interaction.commandName === 'party' || interaction.commandName === 'raidcalculator') {
            interaction.reply({ content: `${interaction.commandName}`, ephemeral: true })
            command.execute(interaction, client)
        }
    } catch (error) {
        console.error(error);
        interaction.followUp({
            content: 'There was an error trying to execute that command!',
        });
    }


});

client.login(process.env.BOT_TOKEN);