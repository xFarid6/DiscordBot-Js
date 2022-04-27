module.exports = {
    name: "suggestions",
    aliases: ["suggest", "suggestion", "suggestions"],
    permissions: [],
    description: "Suggest a command to be added to the bot",
    args: true,
    usage: "<suggestion>",
    execute(message, args, cmd, client, discord) {
        const channel = message.guild.channel.find(c => c.name === "suggestions");
        if (!channel) return message.channel.send("There is no suggestions channel");

        const suggestion = args.join(" ");
        if (!suggestion) return message.channel.send("Please provide a suggestion");

        const embed = new discord.Messageembed() // new discord.RichEmbed()
            .setTitle("Suggestion")
            .setColor(0x00AE86)
            .setDescription(suggestion)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL())
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic : true}));

        channel.send(embed).then(msg => {
            msg.react("✅");
            msg.react("❌");
            msg.delete(300000);
        }).catch(err => {
            console.log(err);
            throw err;
        });
    }
}
