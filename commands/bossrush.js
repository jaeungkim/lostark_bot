const { EmbedBuilder } = require("discord.js");

function calculateRewards(normalTickets, hardTickets, hellTickets) {
  const normalRewards = {
    gems: [0, 0, 1, 2, 0, 0, 0, 0, 0],
    honorLeapStones: 17,
    greatHonorLeapStones: 19,
    cardExp: 0,
  };

  const hardRewards = {
    gems: [0, 0, 0, 1, 2, 0, 0, 0, 0],
    marvelousHonorLeapStones: 15,
    cardExp: 8500,
  };

  const hellRewards = {
    gems: [0, 2, 2, 2, 0, 0, 0, 0, 0],
    marvelousHonorLeapStones: 26,
    cardExp: 8500,
  };

  const totalRewards = {
    gems: normalRewards.gems.map(
      (gem, index) =>
        gem * normalTickets +
        hardRewards.gems[index] * hardTickets +
        hellRewards.gems[index] * hellTickets
    ),
    honorLeapStones: normalTickets * normalRewards.honorLeapStones,
    greatHonorLeapStones: normalTickets * normalRewards.greatHonorLeapStones,
    marvelousHonorLeapStones:
      hardTickets * hardRewards.marvelousHonorLeapStones +
      hellTickets * hellRewards.marvelousHonorLeapStones,
    cardExp:
      hardTickets * hardRewards.cardExp + hellTickets * hellRewards.cardExp,
  };

  return totalRewards;
}

function combineGems(gems) {
  for (let i = 0; i < gems.length - 1; i++) {
    while (gems[i] >= 3) {
      gems[i] -= 3;
      gems[i + 1]++;
    }
  }
  return gems;
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

    const totalRewards = calculateRewards(
      amountOfNormalTickets,
      amountofHardTickets,
      amountofHellTickets
    );
    const combinedGems = combineGems(totalRewards.gems);

    const title = `티켓 갯수: 노말: ${amountOfNormalTickets} |  하드: ${amountofHardTickets} | 헬: ${amountofHellTickets}`;
    const description = `보스러쉬 계산기 입니다.`;
    const fields = [
      { name: "\u200B", value: "\u200B" },
      { name: "2레벨", value: 0, inline: true },
      { name: "3레벨", value: 0, inline: true },
      { name: "4레벨", value: 0, inline: true },
      { name: "5레벨", value: 0, inline: true },
      { name: "6레벨", value: 0, inline: true },
      { name: "7레벨", value: 0, inline: true },
      { name: "8레벨", value: 0, inline: true },
      { name: "9레벨", value: 0, inline: true },
      { name: "10레벨", value: 0, inline: true },
      { name: "\u200B", value: "\u200B" },
      { name: `명돌`, value: 0, inline: true },
      { name: `위명돌`, value: 0, inline: true },
      { name: "경명돌", value: 0, inline: true },
      { name: "카드경험치", value: 0, inline: true },
      { name: "\u200B", value: "\u200B" },
    ];

    fields.forEach((field, index) => {
      if (index >= 1 && index <= 9) {
        field.value = combinedGems[index - 1];
      } else if (index === 11) {
        field.value = totalRewards.honorLeapStones;
      } else if (index === 12) {
        field.value = totalRewards.greatHonorLeapStones;
      } else if (index === 13) {
        field.value = totalRewards.marvelousHonorLeapStones;
      } else if (index === 14) {
        field.value = totalRewards.cardExp;
      }
    });

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
      .setFooter("\u3000".repeat(10) + "|")
      .setTimestamp();

    channel.send({ content: "보스러쉬 계산기 입니다.", embeds: [embed] });
  },
};
