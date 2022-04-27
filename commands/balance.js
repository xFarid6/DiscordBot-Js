module.exports = {
    name: "balance",
    description: "Check your balance.",
    aliases: ["bal", "money", "cash"],
    usage: "balance",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, cmd, client, discord, profileData) {
        const embed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Balance")
            .setDescription(`${profileData.money} coins`)
            .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL());
        message.channel.send(embed);
        message.channel.send(`Your balance is: ${profileData.coins}, your bank is: ${profileData.bank}`);
    }
}