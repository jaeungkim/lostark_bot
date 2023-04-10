const { EmbedBuilder } = require("discord.js");

function updateEmbed(msg, embed, description, partyMember, limit) {
  const partyMemberString =
    partyMember.size > 0
      ? "\n\n파티멤버:" +
        [...partyMember.entries()]
          .map(([userId, role], i) => `\n ${i + 1}. <@${userId}> - ${role}`)
          .join("")
      : "";
  embed
    .setDescription(description + partyMemberString)
    .setTitle(`모집인원 : ${partyMember.size}/${limit}`)
    .setColor("#3498DB");
  msg.edit({ embeds: [embed] });
}

function endEmbed(msg, embed, description, partyMember) {
  const partyMemberString =
    partyMember.size > 0
      ? "\n\n파티멤버:" +
        [...partyMember.entries()]
          .map(([userId, role], i) => `\n ${i + 1}. <@${userId}> - ${role}`)
          .join("")
      : "";
  embed
    .setDescription(description + partyMemberString)
    .setTitle("마감되었습니다")
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
          name: "데칼",
          value: "1069159798463008799",
        },
        {
          name: "쿤겔",
          value: "1069159857996972082",
        },
        {
          name: "칼엘",
          value: "1069159918202011708",
        },
        {
          name: "발탄 노말",
          value: "1069160463939670096",
        },
        {
          name: "발탄 하드",
          value: "1069160518968934541",
        },
        {
          name: "비아 노말",
          value: "1069160575625601044",
        },
        {
          name: "비아 하드",
          value: "1069160635717390376",
        },
        {
          name: "쿠크세이튼",
          value: "1069160697059094579",
        },
        {
          name: "아브-노말12",
          value: "1069160758329487450",
        },
        {
          name: "아브-노말14",
          value: "1069160814294085662",
        },
        {
          name: "아브-노말16",
          value: "1069160878798295090",
        },
        {
          name: "아브-하드12",
          value: "1095112450594050228",
        },
        {
          name: "아브-하드14",
          value: "1095112419572994058",
        },
        {
          name: "아브-하드16",
          value: "1095112648984625283",
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
  async execute(interaction, client) {
    const partyName = interaction.options.get("partyname").value;
    const userId = client.users.cache.get(interaction.user.id);
    const timeName = interaction.options.get("time").value;
    //최소 요구 스펙 option check
    let specName;
    interaction.options.get("spec") !== null
      ? (specName = interaction.options.get("spec").value)
      : null;

    const channel = client.channels.cache.get(interaction.channelId);
    const lineUp = {
      "1069159798463008799": 4, //데칼
      "1069159857996972082": 4, //쿤겔
      "1069159918202011708": 4, //칼엘
      "1069160463939670096": 8, //발탄노말
      "1069160518968934541": 8, //발탄하드
      "1069160575625601044": 8, //비아노말
      "1069160635717390376": 8, //비아하드
      "1069160697059094579": 4, //쿠크세이튼
      "1069160758329487450": 8, //아브12
      "1069160814294085662": 8, //아브14
      "1069160878798295090": 8, //아브16
      "1095112450594050228": 8, //하브12
      "1095112419572994058": 8, //하브14
      "1095112648984625283": 8, //하브16
    };
    const abyssThumbnailObject = {
      "1069159798463008799": "https://i.imgur.com/hILUSzt.png", //데칼
      "1069159857996972082": "https://i.imgur.com/oVY3V8J.png", //쿤겔
      "1069159918202011708": "https://i.imgur.com/ESXZpHZ.png", //칼엘
      "1069160463939670096": "https://i.imgur.com/9lzBT0g.png", //발탄노말
      "1069160518968934541": "https://i.imgur.com/NuskeE7.png", //발탄하드
      "1069160575625601044": "https://i.imgur.com/7TeAcNW.png", //비아노말
      "1069160635717390376": "https://i.imgur.com/7TeAcNW.png", //비아하드
      "1069160697059094579": "https://i.imgur.com/mXSA90P.jpg", //쿠크세이튼
      "1069160758329487450": "https://i.imgur.com/YthsNCa.png", //아브12
      "1069160814294085662": "https://i.imgur.com/YthsNCa.png", //아브14
      "1069160878798295090": "https://i.imgur.com/YthsNCa.png", //아브16
      "1095112450594050228": "https://i.imgur.com/YthsNCa.png", //하브12
      "1095112419572994058": "https://i.imgur.com/YthsNCa.png", //하브14
      "1095112648984625283": "https://i.imgur.com/YthsNCa.png", //하브16
    };
    let limit = lineUp[partyName];
    let abyssThumbnailPics = abyssThumbnailObject[partyName];
    const partyMember = new Map();

    const timeMap = {
      "5분 후": 5 * 60 * 1000,
      "10분 후": 10 * 60 * 1000,
      "15분 후": 15 * 60 * 1000,
      "30분 후": 30 * 60 * 1000,
      "45분 후": 45 * 60 * 1000,
      "1시간 후": 60 * 60 * 1000,
    };

    const timestampUTC = timeMap[timeName]
      ? Math.floor((new Date().getTime() + timeMap[timeName]) / 1000)
      : null;

    const description = `\n모집파티: <@&${partyName}>\n작성자: ${userId}\n시간: ${timeName}${` <t:${timestampUTC}:t>`}\n${
      specName !== undefined ? `최소스펙: ${specName}\n` : ``
    }\n<:DPS:970069528258179103> 딜러 신청\n<:SUPPORT:970069703533940756> 서포터 신청\n<:END:970069824715780157> 마감 (작성자만 클릭 가능 합니다)`;

    let closed = false;
    let embed = new EmbedBuilder()
      .setColor("#3498DB")
      .setTitle(`모집인원 : ${partyMember.size}/${limit}`)
      .setDescription(description)
      .setThumbnail(abyssThumbnailPics)
      .setTimestamp();

    const message = await channel.send({
      content: `<@&${partyName}> 파티 모집 합니다`,
      embeds: [embed],
    });

    await message.react("970069528258179103"); // 딜러 신청 이모지
    await message.react("970069703533940756"); // 서포터 신청 이모지
    await message.react("970069824715780157"); // 마감 이모지

    const filter = (reaction, user) => {
      return !user.bot && user.id !== message.author.id;
    };

    const collector = message.createReactionCollector({
      filter,
      dispose: true,
    });

    collector.on("collect", async (reaction, user) => {
      // 마감 로직
      if (reaction.emoji.name == "END") {
        if (user.id == userId) {
          closed = true;
          await endEmbed(message, embed, description, partyMember);
        } else {
          reaction.users.remove(user.id);
        }
        // 신청 로직
      } else if (!closed && !partyMember.has(user.id)) {
        partyMember.set(user.id, reaction.emoji.name);
        await updateEmbed(message, embed, description, partyMember, limit);
        if (partyMember.size > limit) {
          reaction.users.remove(user.id);
        }
      } else {
        reaction.users.remove(user.id);
      }
    });

    collector.on("remove", async (reaction, user) => {
      // 마감 해제 로직
      if (reaction.emoji.name == "END") {
        if (user.id == userId) {
          closed = false;
          await updateEmbed(message, embed, description, partyMember, limit);
        } else {
          reaction.users.remove(user.id);
        }
        // 신청 해제 로직
      } else if (reaction.emoji.name !== partyMember.get(user.id)) {
        return;
      } else if (!closed && partyMember.delete(user.id)) {
        await updateEmbed(message, embed, description, partyMember, limit);
      } else {
        reaction.users.remove(user.id);
      }
    });
  },
};
