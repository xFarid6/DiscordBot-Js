const profileModel = require('../models/profileSchema');

module.exports = {
    name: "beg",
    description: "Beg for money.",
    aliases: ["beggar"],
    usage: "beg",
    cooldown: 5,
    guildOnly: true,
    execute(message, args, cmd, client, discord, profileData) {
        const embed = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Beg")
            .setDescription(`${profileData.money} coins`)
            .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL());
        message.channel.send(embed);

        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const response = await profileModel.findOneAndUpdate(
            { userID: message.author.id },
            { $inc: { money: randomNumber } },
            { new: true }
        );

        profileData.money += randomNumber;
        profileData.save();

        return message.channel.send(`You got ${randomNumber} coins!`);
    }
}