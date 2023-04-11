const {
  EmbedBuilder,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "bossrush",
  description: "보스러쉬 보석 갯수 calculator",
  
  async execute(interaction, client, selectedTickets = {}) {
    if (!Object.keys(selectedTickets).length) {
      const selectMenu = new MessageSelectMenu()
        .setCustomId("bossrush-select")
        .setPlaceholder("티켓 선택")
        .addOptions([
          {
            label: "Normal",
            value: "normal",
            description: "회랑 노말 티켓 갯수",
          },
          { label: "Hard", value: "hard", description: "회랑 하드 티켓 갯수" },
          { label: "Hell", value: "hell", description: "회랑 헬 티켓 갯수" },
        ]);

      const actionRow = new MessageActionRow().addComponents(selectMenu);

      await interaction.reply({
        content: "보스러쉬 계산기 입니다.",
        components: [actionRow],
        ephemeral: true,
      });
      return;
    }

    const { normalTicket, hardTicket, hellTicket } = selectedTickets;

    const title = `보스러쉬 티켓:`;
    const description = `보스러쉬`;

    const fields = [
      { name: "\u200B", value: "\u200B" },
      {
        name: "normal",
        value: `${normalTicket || 0}`,
        inline: true,
      },
      {
        name: "hard",
        value: `${hardTicket || 0}`,
        inline: true,
      },
      {
        name: "hell",
        value: `${hellTicket || 0}`,
        inline: true,
      },
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

    interaction.channel.send({
      content: "보스러쉬 계산기 입니다.",
      embeds: [embed],
    });
  },
};
