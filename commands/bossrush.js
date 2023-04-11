const { EmbedBuilder } = require("discord.js");

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

    const title = `티켓 갯수: 노말: ${amountOfNormalTickets} |  하드: ${amountofHardTickets} | 헬: ${amountofHellTickets}`;
    const description = `보스러쉬 계산기 입니다.`;
    const fields = [
      { name: "\u200B", value: "\u200B" },
      { name: "2레벨", value: "1", inline: true },
      { name: "3레벨", value: "1", inline: true },
      { name: "4레벨", value: "1", inline: true },
      { name: "5레벨", value: "1", inline: true },
      { name: "6레벨", value: "1", inline: true },
      { name: "7레벨", value: "1", inline: true },
      { name: "8레벨", value: "1", inline: true },
      { name: "9레벨", value: "1", inline: true },
      { name: "10레벨", value: "1", inline: true },
      { name: "\u200B", value: "\u200B" },
      { name: `명돌`, value: `1`, inline: true },
      { name: `위명돌`, value: `1`, inline: true },
      { name: "경명돌", value: `1`, inline: true },
      { name: "카드경험치", value: "\u200B" },
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
      .setFooter("\u3000".repeat(10)+"|")
      .setTimestamp();

    channel.send({ content: "보스러쉬 계산기 입니다.", embeds: [embed] });
  },
};
