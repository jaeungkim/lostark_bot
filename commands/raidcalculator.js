const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'raidcalculator',
    description: '경매 calculator',
    options: [
        {
            name: 'partysize',
            type: 3,
            description: '인원 수',
            required: true,
        },
        {
            name: 'price',
            type: 3,
            description: '경매 아이탬 가격',
            required: true,
        },
    ],
    execute(interaction, client) {
        const channel = client.channels.cache.get(interaction.channelId);

        const price = interaction.options.get('price').value;
        const partysize = interaction.options.get('partysize').value;
        const title = `템 가격: ${price}G (수수료 5%: ${price * 0.95}G)`;
        const description = `순익 분기점: ${price * 0.95 * (partysize - 1) / partysize}G\n분배금: ${price * 0.95 * (1 / partysize)}G\n판매차익: ${price - (price * 0.95 * ((partysize - 1) / partysize))}G`;
        let embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp()
        channel.send({
            content: `경매 계산기 입니다.`,
            embeds: [embed]
        })
    },
}
