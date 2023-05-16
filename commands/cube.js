const { EmbedBuilder } = require("discord.js");

function calculateRewards(
  first_forbiddance,
  second_forbiddance,
  third_forbiddance,
  fourth_forbiddance,
  fifth_forbiddance
) {
  let rewards = {
    level2: first_forbiddance,
    level3: 2 * first_forbiddance + second_forbiddance + 2 * fourth_forbiddance,
    level4: second_forbiddance + 2 * third_forbiddance + 2 * fourth_forbiddance,
    level5: fifth_forbiddance,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
    level10: 0,
    greatHonorLeapStone: 20 * first_forbiddance,
    marvelousHonorLeapStone: 14 * second_forbiddance + 25 * third_forbiddance,
    chanmyungdol: 14 * fourth_forbiddance + 25 * fifth_forbiddance,
    solarGrace:
      6 * first_forbiddance +
      8 * second_forbiddance +
      11 * third_forbiddance +
      12 * fourth_forbiddance +
      13 * fifth_forbiddance,
    solarBlessing:
      3 * first_forbiddance +
      4 * second_forbiddance +
      6 * third_forbiddance +
      7 * fourth_forbiddance +
      8 * fifth_forbiddance,
    solarProtection:
      1 * first_forbiddance +
      2 * second_forbiddance +
      2 * third_forbiddance +
      3 * fourth_forbiddance +
      4 * fifth_forbiddance,
    silver:
      80000 * first_forbiddance +
      100000 * second_forbiddance +
      110000 * third_forbiddance +
      120000 * fourth_forbiddance +
      130000 * fifth_forbiddance,
    cardExp:
      3000 * first_forbiddance +
      9000 * second_forbiddance +
      12000 * third_forbiddance +
      13000 * fourth_forbiddance +
      13500 * fifth_forbiddance,
  };

  mergeGems(rewards, 2);

  return rewards;
}

function mergeGems(rewards, level) {
  if (level >= 10) return;

  const nextLevel = level + 1;
  const gemsToMerge = 3;

  while (rewards[`level${level}`] >= gemsToMerge) {
    const mergedGems = Math.floor(rewards[`level${level}`] / gemsToMerge);
    rewards[`level${nextLevel}`] += mergedGems;
    rewards[`level${level}`] -= mergedGems * gemsToMerge;
  }

  mergeGems(rewards, nextLevel);
}

module.exports = {
  name: "cube",
  description: "큐브 calculator",
  options: [
    {
      name: "first_forbiddance",
      type: 3,
      description: "1금제(1302) 티켓 갯수",
    },
    {
      name: "second_forbiddance",
      type: 3,
      description: "2금제(1490) 티켓 갯수",
    },
    {
      name: "third_forbiddance",
      type: 3,
      description: "3금제(1540) 티켓 갯수",
    },
    {
      name: "fourth_forbiddance",
      type: 3,
      description: "4금제(1580) 티켓 갯수",
    },
    {
      name: "fifth_forbiddance",
      type: 3,
      description: "5금제(1610) 티켓 갯수",
    },
  ],

  execute(interaction, client) {
    const channel = client.channels.cache.get(interaction.channelId);

    //EMOTES
    const marvelEmoji = "<:marvel:1108153783369871421>";
    const greathonorEmoji = "<:greathonor:1108153782015107122>";
    const changmyungEmoji = "<:chanmyung:1108153779267846286>";
    const solargraceEmoji = `<:solargrace:1108154753764040714>`;
    const solarblessingEmoji = `<:solarblessing:1108154751775936533>`;
    const solarprotectionEmoji = `<:solarprotection:1108154756339335319>`;
    const silverEmoji = `<:silver:1108156375839821915>`;

    const amountFirstTickets = Number(
      interaction.options.get("first_forbiddance")?.value ?? 0
    );
    const amountSecondTickets = Number(
      interaction.options.get("second_forbiddance")?.value ?? 0
    );
    const amountThirdTickets = Number(
      interaction.options.get("third_forbiddance")?.value ?? 0
    );
    const amountFourthTickets = Number(
      interaction.options.get("fourth_forbiddance")?.value ?? 0
    );
    const amountFifthTickets = Number(
      interaction.options.get("fifth_forbiddance")?.value ?? 0
    );

    const rewards = calculateRewards(
      amountFirstTickets,
      amountSecondTickets,
      amountThirdTickets,
      amountFourthTickets,
      amountFifthTickets
    );
    let titleParts = [];

    if (amountFirstTickets > 0) {
      titleParts.push(`1금제: ${amountFirstTickets}장`);
    }

    if (amountSecondTickets > 0) {
      titleParts.push(`2금제: ${amountSecondTickets}장`);
    }

    if (amountThirdTickets > 0) {
      titleParts.push(`3금제: ${amountThirdTickets}장`);
    }

    if (amountFourthTickets > 0) {
      titleParts.push(`4금제: ${amountFourthTickets}장`);
    }

    if (amountFifthTickets > 0) {
      titleParts.push(`5금제: ${amountFifthTickets}장`);
    }

    const title = `티켓 갯수: ` + titleParts.join(" | ");
    // const title = `티켓 갯수: 1금제: ${amountFirstTickets}장 |  2금제: ${amountSecondTickets}장 | 3금제: ${amountThirdTickets}장 | 4금제: ${amountFourthTickets}장 | 5금제: ${amountFifthTickets}장`;
    // const description = `큐브 계산기 입니다.`;
    const fields = [
      { name: "\u200B", value: "\u200B" },
      { name: "2레벨", value: `${rewards.level2}`, inline: true },
      { name: "3레벨", value: `${rewards.level3}`, inline: true },
      { name: "4레벨", value: `${rewards.level4}`, inline: true },
      { name: "5레벨", value: `${rewards.level5}`, inline: true },
      { name: "6레벨", value: `${rewards.level6}`, inline: true },
      { name: "7레벨", value: `${rewards.level7}`, inline: true },
      { name: "8레벨", value: `${rewards.level8}`, inline: true },
      { name: "9레벨", value: `${rewards.level9}`, inline: true },
      { name: "10레벨", value: `${rewards.level10}`, inline: true },
      { name: "\u200B", value: "\u200B" },
      {
        name: `위명돌`,
        value: `${greathonorEmoji} ${rewards.greatHonorLeapStone}개`,
        inline: true,
      },
      {
        name: `경명돌`,
        value: `${marvelEmoji} ${rewards.marvelousHonorLeapStone}개`,
        inline: true,
      },
      {
        name: `찬명돌`,
        value: `${changmyungEmoji} ${rewards.chanmyungdol}개`,
        inline: true,
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: `은총`,
        value: `${solargraceEmoji} ${rewards.solarGrace}개`,
        inline: true,
      },
      {
        name: `축복`,
        value: `${solarblessingEmoji} ${rewards.solarBlessing}개`,
        inline: true,
      },
      {
        name: `가호`,
        value: `${solarprotectionEmoji} ${rewards.solarProtection}개`,
        inline: true,
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: `실링`,
        value: `${silverEmoji} ${rewards.silver.toLocaleString()}`,
        inline: true,
      },
      {
        name: "카드경험치",
        value: `${rewards.cardExp.toLocaleString()}`,
        inline: true,
      },
    ];

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.member.user.username,
        iconURL: interaction.member.displayAvatarURL(),
      })
      .setColor("#0099ff")
      .setTitle(title)
      // .setDescription(description)
      .addFields(fields)
      .setThumbnail("https://i.imgur.com/cE7xFGE.png")
      .setTimestamp();

    channel.send({ content: "큐브 계산기 입니다.", embeds: [embed] });
  },
};
