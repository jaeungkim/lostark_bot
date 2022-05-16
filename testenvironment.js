const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
const fs = require('node:fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const client = new Client();

const localClientId = '975195451718520833' //TEST봇클라이언트ID
const localGuildId = '508174833029218305'; //담배 개인 디코 서버 ID

client.commands = new Discord.Collection();
client.prefixes = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const prefixFiles = fs.readdirSync('./prefixes').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of prefixFiles) {
    const prefix = require(`./prefixes/${file}`);
    client.prefixes.set(prefix.name, prefix);
}

// console.log(client.prefixes)

const localRest = new REST({ version: '9' }).setToken(process.env.LOCAL_TOKEN);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await localRest.put(
            Routes.applicationGuildCommands(localClientId, localGuildId),
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


client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    const prefix = client.prefixes.get(message.content.trim());
    if(prefix !== undefined){
        console.log(prefix.description)
    }

    // if(message.content === "!공략"){
    //     message.reply('안녕!');
    // }
    // const prefix = client.prefixes.get()
    // if (message.content === '!공략' && message.author.id === client.application?.owner?.id) {
    //     message.reply('안녕!');
    // }
    // if (message.content === '!deploy' && message.author.id === client.application?.owner?.id) {
    //     await message.guild.commands
    //         .set(client.commands)
    //         .then(() => {
    //             message.reply('Deployed!');
    //         })
    //         .catch(err => {
    //             message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
    //             console.error(err);
    //         });
    // }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    // console.log(interaction)
    const command = client.commands.get(interaction.commandName);    
    try {
        if (interaction.commandName ==='local') {
            interaction.reply({ content: `파티 모집`, ephemeral: true })
            command.execute(interaction, client)
        } 
    } catch (error) {
        console.error(error);
        interaction.followUp({
            content: 'There was an error trying to execute that command!',
        });
    }


});

client.login(process.env.LOCAL_TOKEN);