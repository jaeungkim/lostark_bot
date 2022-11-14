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
  name: "local",
  description: "파티 생성 local.",
  options: [
    {
      name: "partyname",
      type: 3,
      description: "name of party",
      required: true,
      choices: [
        {
          name: "낙원",
          value: "975208948040880138",
        },
      ],
    },
    {
      name: "channel",
      type: 3,
      description: "entering channel name",
      required: true,
      choices: [
        {
          name: "test",
          value: "975200033555222528",
        },
      ],
    },
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
    const channelCode = interaction.options.get("channel").value;
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
    };
    const abyssThumbnailObject = {
      "975208948040880138": "https://i.imgur.com/a1EUP79.png", //낙원
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

    const description = `\n모집파티: <@&${partyName}>\n음성채널: <#${channelCode}>\n작성자: ${userId}\n시간: ${timeName}${` <t:${timestampUTC}:t>`}\n${
      specName !== undefined ? `최소스펙: ${specName}\n` : ``
    }\n <:DPS:975209678600540170> 딜러 신청\n<:SUPPORT:975209691963609128> 서포터 신청\n<:END:975209651748622396> 마감 (작성자만 클릭 가능 합니다)`;
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
        msg.react("975209678600540170"); //딜러 신청 이모지
        msg.react("975209691963609128"); //서포터 신청 이모지
        msg.react("975209651748622396"); //마감 이모지

        // 이모지 입력
        client.on("messageReactionAdd", async (reaction, user) => {
          if (user.id === "975195451718520833") {
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
          if (user.id === "975195451718520833") {
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
