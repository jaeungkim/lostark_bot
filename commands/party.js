const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
module.exports = {
    name: 'party',
    description: '파티 생성 가능합니다.',
    options: [
        {
            name: 'partyname',
            type: 3,
            description: 'name of party',
            required: true,
            choices: [
                {
                    name: '낙원',
                    value: "958141031965130792",
                },
                {
                    name: '오레하 노말 1,2종',
                    value: "958141141520359444",
                },
                {
                    name: '오레하 하드 1,2종',
                    value: "958141192938328064",
                },
            ]
        },
        {
            name: 'channel',
            type: 3,
            description: 'entering channel name',
            required: true,
            choices: [
                {
                    name: '루테란',
                    value: "937590271930163205",
                },
                {
                    name: '베른 북부',
                    value: "956676148039942154",
                },
                {
                    name: '아르데타인',
                    value: "937590271930163206",
                },
                {
                    name: '슈사이어',
                    value: "954163198599262258",
                },
                {
                    name: '로헨델',
                    value: "961829755961884702",
                },
                {
                    name: '욘',
                    value: "963943310806880306",
                },
                {
                    name: '페이튼',
                    value: "954163184925827092",
                },
                {
                    name: '파푸니카',
                    value: "968154355448561744",
                },
                {
                    name: '베른 남부',
                    value: "968154468506030111",
                },
                {
                    name: '토토이크',
                    value: "969405184981733426",
                },
            ]
        },
        {
            name: 'time',
            type: 3,
            description: '시간',
            required: true,
        },
    ],
    execute(interaction, client) {
        const partyName = interaction.options.get('partyname').value;
        const channelName = interaction.options.get('channel').value;
        const userId = client.users.cache.get(interaction.user.id);
        const timeName = interaction.options.get('time').value;
        const channel = client.channels.cache.get(interaction.channelId)

        const partyMember = [interaction.user.id];

        //버튼을 그냥 추가한 상황
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('register')
                .setLabel('참가')
                .setStyle('PRIMARY'),
        )

        //이벤트를 추가하거나 예를들어 그 어떤 유저가 참가를 클릭하면 partyMember.push()

        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`모집인원 현황: ${partyMember.length}/4`)
            .setAuthor({
                name: userId.username,
                iconURL: userId.displayAvatarURL({ dynamic: true })
            })
            .setDescription(`
            
            <@&${partyName}> 파티 <#${channelName}> 시간: ${timeName}
            
            파티 맴버: 
            1. <@${interaction.user.id}>
            2. 
            3. 
            4. 
            `)
            // .setImage('https://imgur.com/a/IVfvxjz')
            .setTimestamp()
        // .setFooter({ text: 'Some footer text here', iconURL: 'https://imgur.com/a/IVfvxjz' });

        //embed업데이트 exampleEmbed->exampleEmbed2 => send 

        channel.send({
            embeds: [exampleEmbed],
            components: [row],
        })


    },

}