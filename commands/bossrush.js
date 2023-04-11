const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "bossrush",
    description: "보스러쉬 보석 갯수 calculator",
    options: [
      {
        name: "normal",
        type: 3,
        description: "회랑 노말 티켓 갯수"
      },
      {
        name: "hard",
        type: 3,
        description: "회랑 하드 티켓 갯수"
      },
      {
        name: "hell",
        type: 3,
        description: "회랑 헬 티켓 갯수"
      },
    ],
    execute(interaction, client) {
      const channel = client.channels.cache.get(interaction.channelId);
      const normalTicket = interaction.options.get("normal").value;
      const hardTicket = interaction.options.get("hard").value;
      const hellTicket = interaction.options.get("hell").value;
  
      const title = `보스러쉬 티켓:`;
      const description = `보스러쉬`;
  
      const fields = [
        { name: "\u200B", value: "\u200B" },
        {
            name: "노말",
            value: `${normalTicket}`,
            inline: true,
          },
          {
            name: "하드",
            value: `${hardTicket}`,
            inline: true,
          },
          {
            name: "헬",
            value: `${hellTicket}`,
            inline: true,
          },
        { name: "\u200B", value: "\u200B" },
      ]
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
  