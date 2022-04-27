module.exports = {
    name: "ban",
    aliases: ["b"],
    permissions: ["admin", "mod"],
    description: "Ban a user from the server",
    args: true,
    usage: "<user> <reason>",
    execute(message, args) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");

        if (!user) {
            return message.reply("Please mention a user to ban!");
        }

        if (!reason) {
            return message.reply("Please provide a reason for the ban!");
        }

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("You don't have permission to ban members!");
        }

        if (!user.kickable) {
            return message.reply("I cannot ban this user!");
        }

        user.ban(reason)
            .catch(error => message.reply(`Sorry, I couldn't ban because of: ${error}`));

        message.reply(`${user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
};