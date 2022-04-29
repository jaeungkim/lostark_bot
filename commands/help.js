const fs = require('fs');

module.exports = {
    name: 'help',
    description: 'List all available commands.',
    execute(interaction) {
        let str = '';
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            str += `Name: ${command.name}, Description: ${command.description} \n`;
        }

        return void interaction.reply({
            content: str,
            ephemeral: true,
        });
    },
    //     guildId = '937590271930163200',
    //     guild = client.guilds.cache.get(guildId),
    //     let commands,

    //     if(guild) {
    //         commands = guild.commands
    //     } else {
    //         commands = client.application?.commands
    //     }

    // commands?.create({
    //         name: '파티',
    //         description: '파티만들기',
    //         options: [
    //             {
    //                 name: 'num1',
    //                 description: 'The first numbers.',
    //                 required: true,
    //                 type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    // },
    // {
    //     name: 'num2',
    //     description: 'The 2 numbers.',
    //     required: true,
    //     type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    // },
    // {
    //     name: 'num3',
    //     description: 'The 3 numbers.',
    //     required: true,
    //     type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    // },
    //     ]
    // })


}