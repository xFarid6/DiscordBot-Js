module.exports = {
    name: 'unmute',
    description: 'UnMutes a user.',
    aliases: ['um'],
    permissions: [],
    async execute(message, args) {
        const target = message.mentions.members.first();
        if (target){ 
            let mainRole = message.guild.roles.cache.find(r => r.name === 'Member');
            let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

            let memberTarget = message.guild.member.cache.get(target.id);

            memberTarget.roles.remove(muteRole);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`${memberTarget} has been unmuted.`);
        } else {
            message.channel.send('Please mention a user to unmute.');
        }
    }
}
