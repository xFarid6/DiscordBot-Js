const profileModel = require('../models/profileSchema');

module.exports = {
    name: "give",
    description: "Give someone money.",
    aliases: ["g"],
    usage: "give <user> <amount>",
    cooldown: 10,
    guildOnly: false,
    permissions: ["ADMINISTRATOR"],
    execute(message, args, cmd, client, discord, profileData) {
        const amount = args[1];
        if (!amount) return message.channel.send("Please enter an amount!");
        if (isNaN(amount)) return message.channel.send("Please enter a valid number!");
        if (amount < 1) return message.channel.send("Please enter a number greater than 0!");
        if (amount > profileData.money) return message.channel.send("You don't have that much money!");
        
        const user = message.mentions.users.first();
        if (!user) return message.channel.send("Please mention a user!");
        if (user.bot) return message.channel.send("You can't give money to a bot!");

        await profileModel.findOneAndUpdate({
            userID: user.id
        }, {
            $inc: {
                coins: amount
            }
        });

        profileData.money += amount;
        profileData.save();
        
        return message.channel.send(`Successfully gave ${amount} to ${user.username}!`);
    },
};