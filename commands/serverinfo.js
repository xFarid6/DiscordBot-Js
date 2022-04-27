module.exports = {
    name: 'serverinfo',
    description: 'Gets information about the server.',
    async execute(message, args) {
        const server = message.guild;
        const embed = new Discord.RichEmbed()
            .setTitle(`${server.name}'s Info`)
            .setColor('#0099ff')
            .setThumbnail(server.iconURL)
            .addField('Server Name', server.name, true)
            .addField('Server ID', server.id, true)
            .addField('Owner', server.owner.user.tag, true)
            .addField('Member Count', server.memberCount, true)
            .addField('Created At', server.createdAt.toLocaleString(), true)
            .setFooter('Powered by https://avatars.io/');
        message.channel.send(embed);
    }
}