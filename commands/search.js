const profileModel = require('../models/profileSchema');

module.exports = {
    name: "search",
    description: "Search for some coin.",
    aliases: ["s"],
    usage: "search <user>",
    cooldown: 1,
    guildOnly: false,
    async execute(message, args, cmd, client, discord, profileData) {
        /*
        const user = message.mentions.users.first();
        if (!user) return message.channel.send("Please mention a user!");
        if (user.bot) return message.channel.send("You can't search a bot!");

        const profile = await profileModel.findOne({
            userID: user.id
        });
        if (!profile) return message.channel.send("That user doesn't have a profile!");

        return message.channel.send(`${user.username} has ${profile.coins} coins!`);
        */

        const locations = [
            "The Moon",
            "The Sun",
            "The Earth",
            "Cartoon World",
            "Bathroom",
            "Truck",
            "Pocket",
            "computer",
            "Cave",
        ];

        const chosenLocation = locations.sort(() => Math.random() - Math.random()).slice(0, 3);

        const filter = (
            { author, content }) => 
            message.author == author && chosenLocation.some(
                (ocation) => location.toLowerCase() == content.toLowerCase());

        const collector = message.createMessageCollector(filter, {max: 1, time: 25000});

        const earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        // (rand number * (MAX - MIN + 1)) + MIN

        collector.on('collect', async (message) => {
            await profileData.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: earnings
                }
            });

            profileData.money += earnings;
            profileData.save();

            return message.channel.send(`You found ${earnings} coins!`);
        });

        collector.on('end', (collected, reason) => {
            if (reason == "time") {
                return message.channel.send(`You didn't find any coins.`);
            }
        });

        message.channel.send(`You are searching for some coins.
            \nYou have ${chosenLocation.join(', ')} to find.
            \nYou have ${25000}ms to find them.`);
    }
};
