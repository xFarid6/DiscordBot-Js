const ms = require('ms');


module.exports = {
    name: 'mute',
    description: 'Mutes a user.',
    aliases: ['m'],
    permissions: [],
    async execute(message, args) {
        const target = message.mentions.members.first();
        if (target){ 
            let mainRole = message.guild.roles.cache.find(r => r.name === 'Member');
            let muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');

            let memberTarget = message.guild.member.cache.get(target.id);

            if (!args[1]){
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole);
                message.channel.send(`${memberTarget} has been muted.`);
                return
            }

            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole);
            message.channel.send(`${memberTarget} has been muted for ${ms(ms(args[1]))}.`);

            setTimeout(function(){
                memberTarget.roles.remove(muteRole);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));

        } else {
            message.channel.send('Please mention a user to mute.');
        }
    }
}
