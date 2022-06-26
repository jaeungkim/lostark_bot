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
        //default chanenl values
        const channel = client.channels.cache.get(interaction.channelId);
        console.log(interaction.member)
        // 계산 values
        const price = interaction.options.get('price').value; //템가격
        const partysize = interaction.options.get('partysize').value; //인원
        const profitprice = Math.round(price * 0.95 * (partysize - 1) / partysize); //손익분기점 (길드팟 분배 손익분기점)
        const eachpartyprice = Math.round(price * 0.95 * (1 / partysize)); //분배금 (개인 분배금)
        const sellprice = price - profitprice; // 판매차익
        const selfsellprice = Math.ceil(profitprice / 1.1); //입찰적정가 (본인이 사서 팔때 최대 추천 입찰 가격)
        const distributedprice = Math.round(selfsellprice / (partysize - 1 / partysize)); //개인 최대 입찰시 안산사람 인당 분배금
        const individualsellpriceprofit = price - selfsellprice;
        const goldemoji = " <:GOLD:990737850767118406>";
        //embed
        const title = `템 가격: ${price}${goldemoji} (수수료 5%: ${price * 0.05}${goldemoji})`;
        const description = `파티 인원: ${partysize}`;
        
        let embed = new MessageEmbed()
            .setAuthor({ name: `${interaction.member.user.username}`, iconURL: `${interaction.member.displayAvatarURL()}`})
            .setColor('#0099ff')
            .setTitle(title)
            .setDescription(description)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '직접 사용시 입찰 추천 가격 입니다.', value: `${Math.ceil(price*0.75) + goldemoji}`},
                { name: '\u200B', value: '\u200B' },
                { name: '파티 기준 계산법 입니다.', value: '(공대 / 지인)'},
                { name: `손익분기점`, value: `${profitprice + goldemoji}`, inline: true},
                { name: `분배금`, value: `${eachpartyprice + goldemoji}`, inline: true},
                { name: '판매차익', value: `${sellprice + goldemoji}(수수료: ${price * 0.95}${goldemoji})`, inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: '공팟 기준 계산법 입니다.', value: '(개인 이득)'},
                { name: '입찰적정가', value: `${selfsellprice + goldemoji}`, inline: true},
                { name: '분배금', value: `${distributedprice + goldemoji}`, inline: true},
                { name: '판매차익', value: `${individualsellpriceprofit + goldemoji}(수수료: ${price * 0.95}${goldemoji})`, inline: true},
            )
            .setThumbnail('https://i.imgur.com/cE7xFGE.png')
            .setTimestamp()

        //channel send
        channel.send({
            content: `경매 계산기 입니다.`,
            embeds: [embed]
        })
    },
}
