const profileModel = require('../models/profileSchema');

module.exports = {
    name: "withdraw",
    description: "Withdraw your money from your bank account.",
    aliases: ["wd"],
    usage: "withdraw <amount>",
    cooldown: 10,
    guildOnly: true,
    execute(message, args, cmd, client, discord, profileData) {
        const amount = args[0];
        if (!amount) return message.channel.send("Please enter an amount!");
        if (isNaN(amount)) return message.channel.send("Please enter a valid number!");
        if (amount < 1) return message.channel.send("Please enter a number greater than 0!");
        if (amount > profileData.bank) return message.channel.send("You don't have that much money in your bank!");

        await profileData.findOneAndUpdate({
            userID: message.author.id
        }, {
            $inc: {
                coins: amount,
                bank: -amount
            }
        });

        profileData.money += amount;
        profileData.bank -= amount;
        profileData.save();

        return message.channel.send(`Successfully withdrew ${amount} from your bank account!`);
    },
};