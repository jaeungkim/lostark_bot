const { EmbedBuilder } = require("discord.js");

function calculateRewards(normal, hard, hell) {
  let rewards = {
    level2: 2 * hell,
    level3: normal + hard + 2 * hell,
    level4: 2 * (normal + hard + hell),
    level5: 0,
    level6: 0,
    level7: 0,
    level8: 0,
    level9: 0,
    level10: 0,
    honorLeapStone: 17 * normal,
    greatHonorLeapStone: 18 * normal,
    marvelousHonorLeapStone: 15 * hard + 26 * hell,
    cardExp: 8500 * (hard + hell),
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
  name: "bossrush",
  description: "보스러쉬 calculator",
  options: [
    {
      name: "normal",
      type: 3,
      description: "회랑 하드 티켓 갯수",
    },
    {
      name: "hard",
      type: 3,
      description: "회랑 하드 티켓 갯수",
    },
    {
      name: "hell",
      type: 3,
      description: "회랑 헬 티켓 갯수",
    },
  ],

  
  execute(interaction, client) {
    const channel = client.channels.cache.get(interaction.channelId);
    const amountOfNormalTickets = interaction.options.get("normal")?.value ?? 0;
    const amountofHardTickets = interaction.options.get("hard")?.value ?? 0;
    const amountofHellTickets = interaction.options.get("hell")?.value ?? 0;
    
    const rewards = calculateRewards(amountOfNormalTickets, amountofHardTickets, amountofHellTickets);

    const title = `티켓 갯수: 노말: ${amountOfNormalTickets} |  하드: ${amountofHardTickets} | 헬: ${amountofHellTickets}`;
    const description = `보스러쉬 계산기 입니다.`;
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
      { name: `명돌`, value: `${rewards.honorLeapStone}`, inline: true },
      { name: `위명돌`, value: `${rewards.greatHonorLeapStone}`, inline: true },
      { name: "경명돌", value: `${rewards.marvelousHonorLeapStone}`, inline: true },
      { name: "카드경험치", value: `${rewards.cardExp}`, inline: true },
      { name: "\u200B", value: "\u200B" },
    ];

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.member.user.username,
        iconURL: interaction.member.displayAvatarURL(),
      })
      .setColor("#0099ff")
      .setTitle(title)
      .setDescription(description)
      .addFields(fields)
      .setThumbnail("https://i.imgur.com/cE7xFGE.png")
      .setTimestamp();

    channel.send({ content: "보스러쉬 계산기 입니다.", embeds: [embed] });
  },
};
