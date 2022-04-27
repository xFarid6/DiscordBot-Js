module.exports = {
    name: "reactionrole",
    description: "React to a message to get a role!",
    execute(message, args, Discord, client) {
        const channel = client.getChannel(message.channel.id);
        const yellowTeamRole = message.guild.roles.find(role => role.name === "Yellow Team");
        const blueTeamRole = message.guild.roles.find(role => role.name === "Blue Team");

        const yellowTeamEmoji = ':lemon:'
        const blueTeamEmoji = ':grape:'

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('React to this message to get a role!')
            .setDescription('Choosing a team will allow interaction with teammates!')
                + `${yellowTeamEmoji} for yello team\n`
                + `${blueTeamEmoji} for blue team`;

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yellowTeamEmoji);
        messageEmbed.react(blueTeamEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (user.bot) return;
            if (!reaction.message.channel.id == channel) return;
            if (reaction.emoji.name === yellowTeamEmoji) {
                await message.guild.members.get(user.id).addRole(yellowTeamRole);
            } else if (reaction.emoji.name === blueTeamEmoji) {
                await message.guild.members.get(user.id).addRole(blueTeamRole);
            } else {
                return;
            }
            
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (user.bot) return;
            if (!reaction.message.channel.id == channel) return;
            if (reaction.emoji.name === yellowTeamEmoji) {
                await message.guild.members.get(user.id).removeRole(yellowTeamRole);
            } else if (reaction.emoji.name === blueTeamEmoji) {
                await message.guild.members.get(user.id).removeRole(blueTeamRole);
            } else {
                return;
            }
        });
    }
};