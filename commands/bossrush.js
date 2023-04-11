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
    const amountOfNormalTickets = interaction.options.get("normal").value || 0;
    const amountofHardTickets = interaction.options.get("hard").value || 0;
    const amountofHellTickets = interaction.options.get("hell").value || 0;
    // const profitprice = Math.round(
    //   (price * 0.95 * (partysize - 1)) / partysize
    // );
    // const eachpartyprice = Math.round((price * 0.95) / partysize);
    // const sellprice = price - profitprice;
    // const selfsellprice = Math.ceil(profitprice / 1.1);
    // const distributedprice = Math.round(
    //   selfsellprice / (partysize - 1 / partysize)
    // );
    // const individualsellpriceprofit = price - selfsellprice;

    const title = `티켓 갯수: ${amountOfNormalTickets} |  ${amountofHardTickets} | ${amountofHellTickets}`;
    // const description = `파티 인원: ${partysize}`;
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
      .addFields(fields)
      .setThumbnail("https://i.imgur.com/cE7xFGE.png")
      .setTimestamp();

    channel.send({ content: "보스러쉬 계산기 입니다.", embeds: [embed] });
  },
};
