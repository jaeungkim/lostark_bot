const { MessageEmbed } = require('discord.js');

function updateEmbed(msg, embed, description, partyMember, limit) {
    let partyMemberString = "";
    let i = 1;
    for (let [userId, role] of partyMember) {
        partyMemberString += `\n ${i++}. <@${userId}> - ${role}`;
    }
    embed.setDescription(description + partyMemberString).setTitle(`모집인원 : ${partyMember.size}/${limit}`);
    msg.edit({ embeds: [embed] });
}

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
                    name: '벨가누스',
                    value: "958141432357613608",
                },
                {
                    name: '오레하 노말 1,2종',
                    value: "958141141520359444",
                },
                {
                    name: '오레하 하드 1,2종',
                    value: "958141192938328064",
                },
                {
                    name: '아르고스 1페',
                    value: "958141240598212628",
                },
                {
                    name: '아르고스 2페',
                    value: "958141283078119454",
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
        const channelCode = interaction.options.get('channel').value;
        const userId = client.users.cache.get(interaction.user.id);
        const timeName = interaction.options.get('time').value;
        const channel = client.channels.cache.get(interaction.channelId);
        const lineUp = {
            "958141031965130792": 8,
            "958141432357613608": 4,
            "958141141520359444": 4,
            "958141192938328064": 4,
            "958141240598212628": 8,
            "958141283078119454": 8,
        }

        let limit = lineUp[partyName];
        const partyMember = new Map();
        const description = `
            모집파티: <@&${partyName}> 
            파티 보이스쳇: <#${channelCode}> 
            시간: ${timeName}

            <:DPS:970069528258179103> : 딜러 신청
            <:SUPPORT:970069703533940756> : 서포터 신청

            파티멤버:`;
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`모집인원 : ${partyMember.size}/${limit}`)
            .setAuthor({
                name: userId.username,
                iconURL: userId.displayAvatarURL({ dynamic: true })
            })
            .setDescription(description)
            .setTimestamp();
        channel.send({ 
            // content: `<@&${partyName}> `,
            embeds: [embed] 
        }).then(msg => {
            msg.react("970069528258179103"); //딜러 신청 이모지
            msg.react("970069703533940756"); //서포터 신청 이모지
            client.on('messageReactionAdd', async (reaction, user) => {
                if (user.id === '968623822037205032') { return; }
                if (reaction && reaction.message.id === msg.id) {
                    if (!partyMember.has(user.id)) {
                        partyMember.set(user.id, reaction.emoji.name);
                        await updateEmbed(msg, embed, description, partyMember, limit);
                    } else {
                        reaction.users.remove(user.id);
                    }
                }
                if (partyMember.size > limit) {
                    reaction.users.remove(user.id);
                    return;
                }
            })
            client.on('messageReactionRemove', async (reaction, user) => {
                if (user.id === '968623822037205032') { return; }
                if (reaction && reaction.message.id === msg.id) {
                    if (reaction.emoji.name !== partyMember.get(user.id)) { return; }
                    if (partyMember.delete(user.id)) {
                        await updateEmbed(msg, embed, description, partyMember, limit);
                    }
                }
            });

        })
    },
}