const { MessageEmbed } = require('discord.js');

function updateEmbed(msg, embed, description, partyMember, limit) {
    let partyMemberString = ""
    if (partyMember.size > 0) {
        partyMemberString += "\n\n파티멤버:";
    }
    let i = 1;
    for (let [userId, role] of partyMember) {
        partyMemberString += `\n ${i++}. <@${userId}> - ${role}`;
    }
    embed.setDescription(description + partyMemberString).setTitle(`모집인원 : ${partyMember.size}/${limit}`).setColor("#3498DB");
    msg.edit({ embeds: [embed] });
}
function endEmbed(msg, embed, description, partyMember, limit) {
    let partyMemberString = ""
    if (partyMember.size > 0) {
        partyMemberString += "\n\n파티멤버:";
    }
    let i = 1;
    for (let [userId, role] of partyMember) {
        partyMemberString += `\n ${i++}. <@${userId}> - ${role}`;
    }
    embed.setDescription(description + partyMemberString).setTitle(`	
    마감되었습니다` ).setColor("#ff5555");
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
                    name: '6종카드작',
                    value: "963934056666525766",
                },
                {
                    name: '1302 중갑나크',
                    value: "970489497684946964",
                },
                {
                    name: '1340 이그렉시온',
                    value: "970452969801797683",
                },
                {
                    name: '1375 요호',
                    value: "958141396009746502",
                },
                {
                    name: '벨가누스',
                    value: "958141432357613608",
                },
                {
                    name: '데스칼루다',
                    value: "980537738564604014",
                },
                {
                    name: "쿤겔라니움",
                    value: "992484893814698194",
                },
                {
                    name: '도가토',
                    value: "980538984142893116",
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
                {
                    name: '아르고스 3페',
                    value: "958141319417581598",
                },
                {
                    name: '발탄 노말',
                    value: "976236274614665248",
                },
                {
                    name: '영웅지도 품앗이',
                    value: "972654863823568926",
                },
                {
                    name: '전설지도 품앗이',
                    value: "972654999844847636",
                },
                {
                    name: '16인점령전',
                    value: '992863210027876542',
                },
                {
                    name: '20인토벌전',
                    value: '992866539160215654',
                }
                
            ]
        },
        {
            name: 'channel',
            type: 3,
            description: 'entering channel name',
            required: true,
            choices: [
                {
                    name: '👛CHANEL',
                    value: "954163198599262258",
                },
                {
                    name: '👓Gucci',
                    value: "937590271930163206",
                },
                {
                    name: '👔Thom Browne',
                    value: "961829755961884702",
                },
                {
                    name: '👜Louis Vuitton',
                    value: "968154468506030111",
                },
                {
                    name: '🥼MONCLER',
                    value: "956676148039942154",
                },
                {
                    name: '👠VALENTINO',
                    value: "969405184981733426",
                },
                {
                    name: '💼Hermes',
                    value: "988076596793597982",
                },
                {
                    name: '🧥Burberry',
                    value: "937590271930163205",
                },
                {
                    name: '👞Cartier',
                    value: "954163184925827092",
                },
                {
                    name: '👑Dior',
                    value: "968154355448561744",
                },
                {
                    name: '👟Dsquared2',
                    value: "957097126393970768",
                },
                {
                    name: '👒Chloe',
                    value: "963943310806880306",
                },
                {
                    name: '🩳Dongdaemun',
                    value: "983160674026942564",
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
            "958141031965130792": 8, //낙원
            "963934056666525766": 4, //6종
            "970489497684946964": 4, //중갑나크
            "970452969801797683": 4, //이그렉시온
            "958141396009746502": 4, //요호
            "958141432357613608": 4, //벨가누스
            "980537738564604014": 4, //데스칼루다
            "992484893814698194": 4, //쿤겔라니움
            "980538984142893116": 4, //도가토
            "958141141520359444": 4, //오레하노말
            "958141192938328064": 4, //오레하하드
            "958141240598212628": 8, //아르고스1페
            "958141283078119454": 8, //아르고스2페
            "958141319417581598": 8, //아르고스3페
            "976236274614665248": 8, //발탄 노말
            "972654863823568926": 4, //영웅지도
            "972654999844847636": 4, //전설지도    
            "992863210027876542": 16, //트랭퀼
            "992866539160215654": 20, //카스릭 토벌
        }
        const abyssThumbnailObject = {
            "958141031965130792": "https://i.imgur.com/a1EUP79.png", //낙원
            "963934056666525766": "https://i.imgur.com/2pgZXTx.jpg", //6종카드작
            "970489497684946964": "https://i.imgur.com/Gra8TTR.png", //중나
            "970452969801797683": "https://i.imgur.com/WFsJbJV.png", //이그렉시온
            "958141396009746502": "https://i.imgur.com/M3NcVim.png", //요호
            "958141432357613608": "https://i.imgur.com/bkqEby8.png", //벨가누스
            "980537738564604014": "https://i.imgur.com/hILUSzt.png", //데스칼루다
            "992484893814698194": "https://i.imgur.com/oVY3V8J.png", //쿤겔라니움
            "980538984142893116": "https://i.imgur.com/oUwLRB1.png", //도가토
            "958141141520359444": "https://i.imgur.com/ObL6aLg.png", //오레하노말
            "958141192938328064": "https://i.imgur.com/75rrAIN.png", //오레하하드
            "958141240598212628": "https://i.imgur.com/a9SAtpt.png", //아르고스1페
            "958141283078119454": "https://i.imgur.com/4ky0VHG.jpg", //아르고스2페
            "958141319417581598": "https://i.imgur.com/9JyAN18.jpg", //아르고스3페
            "976236274614665248": "https://i.imgur.com/9lzBT0g.png", //발탄 노말
            "972654863823568926": "https://i.imgur.com/Rn0eBcp.png", //영웅지도
            "972654999844847636": "https://i.imgur.com/Rn0eBcp.png", //전설지도
            "992863210027876542": "https://i.imgur.com/kgkBMei.png", //트랭퀼
            "992866539160215654": "https://i.imgur.com/hnQuwVf.png", //카스릭토벌
        }
        let limit = lineUp[partyName];
        let abyssThumbnailPics = abyssThumbnailObject[partyName];
        const partyMember = new Map();
        const description = `\n모집파티: <@&${partyName}>\n음성채널: <#${channelCode}>\n작성자: ${userId}\n시간: ${timeName}\n\n<:DPS:970069528258179103> 딜러 신청\n<:SUPPORT:970069703533940756> 서포터 신청\n<:END:970069824715780157> 마감 (작성자만 클릭 가능 합니다)`;
        let closed = false;
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`모집인원 : ${partyMember.size}/${limit}`)
            .setDescription(description)
            .setThumbnail(abyssThumbnailPics)
            .setTimestamp()
            .setColor("#3498DB")
        channel.send({
            content: `<@&${partyName}> 파티 모집 합니다`,
            embeds: [embed],
        }).then(msg => {
            msg.react("970069528258179103"); //딜러 신청 이모지
            msg.react("970069703533940756"); //서포터 신청 이모지
            msg.react("970069824715780157"); //마감 이모지

            // 이모지 입력
            client.on('messageReactionAdd', async (reaction, user) => {
                if (user.id === '968623822037205032') { return; }
                if (reaction && reaction.message.id === msg.id) {
                    // 마감 로직
                    if (reaction.emoji.name == 'END') {
                        if (user.id == userId) {
                            closed = true;
                            await endEmbed(msg, embed, description, partyMember);
                            //embed update
                        } else {
                            reaction.users.remove(user.id);
                        }
                        // 신청 로직
                    } else {
                        if (!closed && !partyMember.has(user.id)) {
                            partyMember.set(user.id, reaction.emoji.name);
                            await updateEmbed(msg, embed, description, partyMember, limit);
                        } else {
                            reaction.users.remove(user.id);
                        }
                        if (partyMember.size > limit) {
                            reaction.users.remove(user.id);
                        }
                    }
                }
            })

            // 이모지 입력 해재
            client.on('messageReactionRemove', async (reaction, user) => {
                if (user.id === '968623822037205032') { return; }
                if (reaction && reaction.message.id === msg.id) {
                    // 마감 해재 로직
                    if (reaction.emoji.name == 'END') {
                        if (user.id == userId) {
                            closed = false;
                            await updateEmbed(msg, embed, description, partyMember, limit);
                            //embed update
                        } else {
                            reaction.users.remove(user.id);
                        }
                        // 신청 해재 로직
                    } else {
                        if (reaction.emoji.name !== partyMember.get(user.id)) { return; }
                        if (!closed && partyMember.delete(user.id)) {
                            await updateEmbed(msg, embed, description, partyMember, limit);
                        } else {
                            reaction.users.remove(user.id);
                        }
                    }
                }
            });
        })
    },
}
