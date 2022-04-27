module.exports = {
    name: 'help',
    description: 'Provides help to users',
    aliases: ['h'],
    permissions: [],
    async execute(message, args, cmd, client, discord) {
        const embed = new discord.MessageEmbed()
            .setTitle('Help')
            .setColor('#0099ff')
            .setDescription('This is a list of commands and their descriptions.')
            .addField('!help', 'Provides this list of commands.')
            .addField('!ping', 'Pong!')
            .addField('!ticket', 'Creates a ticket channel.')
            .addField('!kick', 'Kicks a user.')
            .addField('!ban', 'Bans a user.')
            .addField('!mute', 'Mutes a user.')
            .addField('!unmute', 'Unmutes a user.')
            .addField('!purge', 'Deletes a number of messages.')
            .addField('!say', 'Repeats a message.')
            .addField('!serverinfo', 'Provides information about the server.')
            .addField('!userinfo', 'Provides information about the user.')
            .addField('!avatar', 'Provides the user\'s avatar.')
            .addField('!invite', 'Provides the bot\'s invite link.')
            .addField('!botinfo', 'Provides information about the bot.')
            .addField('!report', 'Reports a user.')
            .addField('!warn', 'Warns a user.')
            .addField('!clear', 'Clears a number of messages.')
            .addField('!mutechannel', 'Mutes a channel.')
            .addField('!unmutechannel', 'Unmutes a channel.')
            .addField('!mutevoice', 'Mutes a voice channel.')
            .addField('!unmutevoice', 'Unmutes a voice channel.')
            .addField('!setnickname', 'Sets the nickname of a user.')
            .addField('!setgame', 'Sets the game of the bot.')
            .addField('!setstatus', 'Sets the status of the bot.')
            .addField('!setwelcome', 'Sets the welcome message.')
            .addField('!setleave', 'Sets the leave message.')
            .addField('!setwelcomemessage', 'Sets the welcome message.')
            .addField('!setleavemessage', 'Sets the leave message.')
        
        message.channel.send(embed);
    }
}