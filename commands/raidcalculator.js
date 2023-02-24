const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "raidcalculator",
  description: "경매 calculator",
  options: [
    {
      name: "partysize",
      type: 3,
      description: "인원 수",
      required: true,
    },
    {
      name: "price",
      type: 3,
      description: "경매 아이탬 가격",
      required: true,
    },
  ],
  execute(interaction, client) {
    const channel = client.channels.cache.get(interaction.channelId);
    const price = interaction.options.get("price").value;
    const partysize = interaction.options.get("partysize").value;
    const goldemoji = " <:GOLD:990737850767118406>";
    const fee = Math.round(price * 0.05);
    const profitprice = Math.round(
      (price * 0.95 * (partysize - 1)) / partysize
    );
    const eachpartyprice = Math.round((price * 0.95) / partysize);
    const sellprice = price - profitprice;
    const selfsellprice = Math.ceil(profitprice / 1.1);
    const distributedprice = Math.round(
      selfsellprice / (partysize - 1 / partysize)
    );
    const individualsellpriceprofit = price - selfsellprice;

    const title = `템 가격: ${price}${goldemoji} (수수료 5%: ${fee}${goldemoji})`;
    const description = `파티 인원: ${partysize}`;
    const fields = [
      { name: "\u200B", value: "\u200B" },
      { name: "파티 기준 계산법 입니다. (공대 / 지인)", value: "\u200B" },
      { name: `손익분기점`, value: `${profitprice}${goldemoji}`, inline: true },
      { name: `분배금`, value: `${eachpartyprice}${goldemoji}`, inline: true },
      { name: "판매차익", value: `${sellprice}${goldemoji}`, inline: true },
      { name: "\u200B", value: "\u200B" },
      { name: "공팟 기준 계산법 입니다. (개인 이득)", value: "\u200B" },
      {
        name: "입찰적정가",
        value: `${selfsellprice}${goldemoji}`,
        inline: true,
      },
      {
        name: "분배금",
        value: `${distributedprice}${goldemoji}`,
        inline: true,
      },
      {
        name: "판매차익",
        value: `${individualsellpriceprofit}${goldemoji}`,
        inline: true,
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: "직접 사용시 입찰 추천 가격 입니다.",
        value: `${Math.ceil(price * 0.75)}${goldemoji}`,
      },
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

    channel.send({ content: "경매 계산기 입니다.", embeds: [embed] });
  },
};
