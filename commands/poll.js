module.exports = {
    name: 'poll',
    description: 'Creates a poll.',
    async execute(message, args) {
        const poll_query = args.join(' ');
        if (!poll_query) {
            return message.channel.send('You need to specify a poll query!');
        }
        const embed = new Discord.RichEmbed()
            .setTitle(`Poll: ${poll_query}`)
            .setColor('#0099ff')
            .setFooter('Powered by https://avatars.io/');
        message.channel.send(embed);

        const collector = message.channel.createMessageCollector(m => m.author.id === message.author.id, { time: 30000 });
        collector.on('collect', message => {
            if (message.content.toLowerCase() === 'yes') {
                embed.addField('Yes', '0');
            } else if (message.content.toLowerCase() === 'no') {
                embed.addField('No', '0');
            } else {
                return message.channel.send('Please specify either `yes` or `no`.');
            }
        });
        collector.on('end', collected => {
            message.channel.send(embed);
        });

        /*
        collector.on('collect', message => {
            if (message.content.toLowerCase() === 'yes') {
                embed.fields[0].value++;
            } else if (message.content.toLowerCase() === 'no') {
                embed.fields[1].value++;
            }
        });

        collector.on('end', collected => {
            message.channel.send(embed);
        });
        */
    }
}