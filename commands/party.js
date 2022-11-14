const { MessageEmbed } = require("discord.js");

function updateEmbed(msg, embed, description, partyMember, limit) {
  let partyMemberString = "";
  if (partyMember.size > 0) {
    partyMemberString += "\n\n파티멤버:";
  }
  let i = 1;
  for (let [userId, role] of partyMember) {
    partyMemberString += `\n ${i++}. <@${userId}> - ${role}`;
  }
  embed
    .setDescription(description + partyMemberString)
    .setTitle(`모집인원 : ${partyMember.size}/${limit}`)
    .setColor("#3498DB");
  msg.edit({ embeds: [embed] });
}
function endEmbed(msg, embed, description, partyMember, limit) {
  let partyMemberString = "";
  if (partyMember.size > 0) {
    partyMemberString += "\n\n파티멤버:";
  }
  let i = 1;
  for (let [userId, role] of partyMember) {
    partyMemberString += `\n ${i++}. <@${userId}> - ${role}`;
  }
  embed
    .setDescription(description + partyMemberString)
    .setTitle(
      `	
    마감되었습니다`
    )
    .setColor("#ff5555");
  msg.edit({ embeds: [embed] });
}
module.exports = {
  name: "party",
  description: "파티 생성 가능합니다.",
  options: [
    {
      name: "partyname",
      type: 3,
      description: "name of party",
      required: true,
      choices: [
        {
          name: "낙원",
          value: "958141031965130792",
        },
        {
          name: "6종카드작",
          value: "963934056666525766",
        },
        {
          name: "도가토",
          value: "980538984142893116",
        },
        {
          name: "큐브",
          value: "1017108443250831360",
        },
        {
          name: "보스러쉬",
          value: "1017108619185111072",
        },
        {
          name: "오레하 하드 1,2종",
          value: "958141192938328064",
        },
        {
          name: "아르고스 3페",
          value: "958141319417581598",
        },
        {
          name: "아르고스 본1부1",
          value: "995795480057491466",
        },
        {
          name: "쿤겔라니움",
          value: "992484893814698194",
        },
        {
          name: "요호 본1부1",
          value: "999721733378551820",
        },
        {
          name: "요호 본1부3",
          value: "1017108677569818694",
        },
        {
          name: "발탄 노말",
          value: "976236274614665248",
        },
        {
          name: "발탄 하드",
          value: "995791564922179585",
        },
        {
          name: "비아 노말",
          value: "995795764385169409",
        },
        {
          name: "비아 하드",
          value: "995795772413071502",
        },
        {
          name: "쿠크세이튼",
          value: "1026310971356102677",
        },
        {
          name: "데칼 본1부1",
          value: "1039241385141866617",
        },
        {
          name: "데칼 본1부2",
          value: "1039241482340671508",
        },
        {
          name: "데칼 본1부3",
          value: "1039241642051391598",
        },
      ],
    },
    // {
    //   name: "channel",
    //   type: 3,
    //   description: "entering channel name",
    //   required: true,
    //   choices: [
    //     {
    //       name: `🔱레이드-A`, //🔱레이드-A
    //       value: "954163198599262258",
    //     },
    //     {
    //       name: `🔱레이드-B`,
    //       value: "937590271930163206",
    //     },
    //     {
    //       name: `🔱레이드-C`,
    //       value: "961829755961884702",
    //     },
    //     {
    //       name: `🔱레이드-D`,
    //       value: "968154468506030111",
    //     },
    //     {
    //       name: `🔱레이드-E`,
    //       value: "956676148039942154",
    //     },
    //     {
    //       name: `🔱레이드-F`,
    //       value: "969405184981733426",
    //     },
    //     {
    //       name: `🔱레이드-G`,
    //       value: "988076596793597982",
    //     },
    //     {
    //       name: `🔱레이드-H`,
    //       value: "937590271930163205",
    //     },
    //     {
    //       name: `🔱레이드-I`,
    //       value: "954163184925827092",
    //     },
    //     {
    //       name: `🔱레이드-J`,
    //       value: "968154355448561744",
    //     },
    //   ],
    // },
    {
      name: "time",
      type: 3,
      description: "시간",
      required: true,
      choices: [
        {
          name: "5분 후",
          value: "5분 후",
        },
        {
          name: "10분 후",
          value: "10분 후",
        },
        {
          name: "15분 후",
          value: "15분 후",
        },
        {
          name: "30분 후",
          value: "30분 후",
        },
        {
          name: "45분 후",
          value: "45분 후",
        },
        {
          name: "1시간 후",
          value: "1시간 후",
        },
      ],
    },
    {
      name: "spec",
      type: 3,
      description: "최소 스펙",
      required: false,
    },
  ],
  execute(interaction, client) {
    const partyName = interaction.options.get("partyname").value;
    // const channelCode = interaction.options.get("channel").value;
    const userId = client.users.cache.get(interaction.user.id);
    const timeName = interaction.options.get("time").value;

    //최소 요구 스펙 option check
    let specName;
    interaction.options.get("spec") !== null
      ? (specName = interaction.options.get("spec").value)
      : null;

    const channel = client.channels.cache.get(interaction.channelId);
    const lineUp = {
      "958141031965130792": 8, //낙원
      "963934056666525766": 4, //6종
      "980538984142893116": 4, //도가토
      "1017108443250831360": 4, //큐브
      "1017108619185111072": 4, //보스러쉬
      "958141192938328064": 4, //오레하하드
      "958141319417581598": 8, //아르고스3페
      "995795480057491466": 8, //아르고스본1부1
      "992484893814698194": 4, //쿤겔라니움
      "999721733378551820": 4, //요호 본1부1
      "1017108677569818694": 4, //요호 본1부3
      "976236274614665248": 8, //발탄 노말
      "995791564922179585": 8, //발탄 하드
      "995795764385169409": 8, //비아 노말
      "995795772413071502": 8, //비아 하드
      "1026310971356102677": 4, //쿠크
      "1039241385141866617": 4, //데칼 본1부1
      "1039241482340671508": 4, //데칼 본1부2
      "1039241642051391598": 4, //데칼 본1부3
    };
    const abyssThumbnailObject = {
      "958141031965130792": "https://i.imgur.com/a1EUP79.png", //낙원
      "963934056666525766": "https://i.imgur.com/2pgZXTx.jpg", //6종카드작
      "980538984142893116": "https://i.imgur.com/oUwLRB1.png", //도가토
      "1017108443250831360": "https://i.imgur.com/oUwLRB1.png", //큐브
      "1017108619185111072": "https://i.imgur.com/oUwLRB1.png", //보스러쉬
      "958141192938328064": "https://i.imgur.com/75rrAIN.png", //오레하하드
      "958141319417581598": "https://i.imgur.com/9JyAN18.jpg", //아르고스3페
      "995795480057491466": "https://i.imgur.com/75rrAIN.png", //아르고스본1부1
      "992484893814698194": "https://i.imgur.com/oVY3V8J.png", //쿤겔라니움
      "999721733378551820": "https://i.imgur.com/M3NcVim.png", //요호 본1부1
      "1017108677569818694": "https://i.imgur.com/M3NcVim.png", //요호 본1부3
      "976236274614665248": "https://i.imgur.com/9lzBT0g.png", //발탄 노말
      "995791564922179585": "https://i.imgur.com/NuskeE7.png", //발탄 하드
      "995795764385169409": "https://i.imgur.com/7TeAcNW.png", //비아 노말
      "995795772413071502": "https://i.imgur.com/7TeAcNW.png", //비아 하드
      "1026310971356102677": "https://i.imgur.com/mXSA90P.jpg", //쿠크
      "1039241385141866617": "https://i.imgur.com/hILUSzt.png", //데칼 본1부1
      "1039241482340671508": "https://i.imgur.com/hILUSzt.png", //데칼 본1부2
      "1039241642051391598": "https://i.imgur.com/hILUSzt.png", //데칼 본1부3
    };
    let limit = lineUp[partyName];
    let abyssThumbnailPics = abyssThumbnailObject[partyName];
    const partyMember = new Map();

    let timestampUTC = Math.floor(new Date().getTime() / 1000);
    if (timeName == "5분 후") {
      timestampUTC = Math.floor((new Date().getTime() + 5 * 60 * 1000) / 1000);
    } else if (timeName == "10분 후") {
      timestampUTC = Math.floor((new Date().getTime() + 10 * 60 * 1000) / 1000);
    } else if (timeName == "15분 후") {
      timestampUTC = Math.floor((new Date().getTime() + 15 * 60 * 1000) / 1000);
    } else if (timeName == "30분 후") {
      timestampUTC = Math.floor((new Date().getTime() + 30 * 60 * 1000) / 1000);
    } else if (timeName == "45분 후") {
      timestampUTC = Math.floor((new Date().getTime() + 45 * 60 * 1000) / 1000);
    } else if (timeName == "1시간 후") {
      timestampUTC = Math.floor((new Date().getTime() + 60 * 60 * 1000) / 1000);
    } else {
      return;
    }

    const description = `\n모집파티: <@&${partyName}>\n작성자: ${userId}\n시간: ${timeName}${` <t:${timestampUTC}:t>`}\n${
      specName !== undefined ? `최소스펙: ${specName}\n` : ``
    }\n:DPS: 딜러 신청\n:SUPPORT: 서포터 신청\n:END: 마감 (작성자만 클릭 가능 합니다)`;
    let closed = false;
    let embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`모집인원 : ${partyMember.size}/${limit}`)
      .setDescription(description)
      .setThumbnail(abyssThumbnailPics)
      .setTimestamp()
      .setColor("#3498DB");
    channel
      .send({
        content: `<@&${partyName}> 파티 모집 합니다`,
        embeds: [embed],
      })
      .then((msg) => {
        msg.react("970069528258179103"); //딜러 신청 이모지
        msg.react("970069703533940756"); //서포터 신청 이모지
        msg.react("970069824715780157"); //마감 이모지

        // 이모지 입력
        client.on("messageReactionAdd", async (reaction, user) => {
          if (user.id === "968623822037205032") {
            return;
          }
          if (reaction && reaction.message.id === msg.id) {
            // 마감 로직
            if (reaction.emoji.name == "END") {
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
        });

        // 이모지 입력 해재
        client.on("messageReactionRemove", async (reaction, user) => {
          if (user.id === "968623822037205032") {
            return;
          }
          if (reaction && reaction.message.id === msg.id) {
            // 마감 해재 로직
            if (reaction.emoji.name == "END") {
              if (user.id == userId) {
                closed = false;
                await updateEmbed(msg, embed, description, partyMember, limit);
                //embed update
              } else {
                reaction.users.remove(user.id);
              }
              // 신청 해재 로직
            } else {
              if (reaction.emoji.name !== partyMember.get(user.id)) {
                return;
              }
              if (!closed && partyMember.delete(user.id)) {
                await updateEmbed(msg, embed, description, partyMember, limit);
              } else {
                reaction.users.remove(user.id);
              }
            }
          }
        });
      });
  },
};
