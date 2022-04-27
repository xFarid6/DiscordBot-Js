module.exports = {
    name: 'ticket',
    description: 'Creates a ticket channel.',
    aliases: ['t'],
    permissions: ['ADMINISTRATOR'],
    async execute(message, args, cmd, client, discord) {
        const ticket_channel = await message.guild.createChannel(`ticket: ${message.author.username}`);
        channel.setParent(message.guild.channels.find(c => c.name === 'Tickets'));

        channel.updateOverwrite(message.guild.roles.find(r => r.name === '@everyone'), {
            'VIEW_CHANNEL': false,
            'SEND_MESSAGES': false
        });

        channel.updateOverwrite(message.author, {
            'VIEW_CHANNEL': true,
            'SEND_MESSAGES': true
        });


        const reactionMessage = await channel.send(`${message.author.username}, Thank you for contacting support|`);

        try {
            await reactionMessage.react('📩');
            await reactionMessage.react('📤');
        } catch (err) {
            console.log(err);
            channel.send(`${message.author.username}, An error has occured. Please try again.`);
            throw err;
        }

        const collector = reactionMessage.createReactionCollector(
            (reaction, user) => message.guild.members.cache.find(
                (member) => member.id === user.id).hasPermission('ADMINISTRATOR'),
                { dispose: true }
        );

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '📩') {
                const embed = new discord.MessageEmbed()
                    .setTitle(`${message.author.username}'s Ticket`)
                    .setColor('#0099ff')
                    .setDescription(`${message.author.username} has opened a ticket.`)
                    .setTimestamp();

                const ticketMessage = await channel.send(embed);
                await ticketMessage.react('📤');
                await ticketMessage.react('📩');
            } else if (reaction.emoji.name === '📤') {
                const embed = new discord.MessageEmbed()
                    .setTitle(`${message.author.username}'s Ticket`)
                    .setColor('#0099ff')
                    .setDescription(`${message.author.username} has closed the ticket.`)
                    .setTimestamp();
                    
                const ticketMessage = await channel.send(embed);
                await ticketMessage.react('📤');
                await ticketMessage.react('📩');
            }
        });

        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case '📩':
                    channel.updateOverwrite(message.author, { 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true });
                    break;
                case '📤':
                    channel.send("Deleting channel in 5 seconds...");
                    channel.updateOverwrite(message.author, { 'VIEW_CHANNEL': false, 'SEND_MESSAGES': false });
                    setTimeout(() => channel.delete(), 5000);
                    break;

                default:
                    break;
            }
        });

        collector.on('end', (collected) => {
            console.log(collected.size);
        });

        collector.on('dispose', (collected) => {
            console.log(collected.size);
        });

        collector.on('remove', (collected) => {
            console.log(collected.size);
        });

        message.channel.send("We will be right with you!").then((msg) => {
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 7000);
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    },
};