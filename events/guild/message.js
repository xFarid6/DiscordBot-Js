require("dotenv").config();
const profileModel = require("../../models/profileSchema");

// create cooldowns map
const cooldowns = new Map();
module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            const newProfile = new profileModel({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
            });
            newProfile.save();
        }
    } catch (err) {
        console.log(err);
    }


    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd));
    if (!command) return message.channel.send("Command not found!");

    const validPermissions = [
        "ADMINISTRATOR", 
        "MANAGE_GUILD", 
        "MANAGE_ROLES", 
        "MANAGE_CHANNELS", 
        "KICK_MEMBERS", 
        "BAN_MEMBERS", 
        "MANAGE_MESSAGES", 
        "MANAGE_NICKNAMES", 
        "MANAGE_EMOJIS",
        "MANAGE_WEBHOOKS",
        "MANAGE_MESSAGES",
        "MANAGE_NICKNAMES",
        "MANAGE_EMOJIS",
        "CREATE_INSTANT_INVITE",
        "CHANGE_NICKNAME",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        // "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "READ_MESSAGE_HISTORY",
    ];

    if (!validPermissions.includes(command.permissions)) {
        return message.channel.send("You don't have permission to use this command!");
    }

    if (command.permissions.lenght){
        let invalidPerms = [];
        for (const permission of command.permissions) {
            if (!validPermissions.includes(permission)) {
                return console.log(`${permission} is not a valid permission!`);
            }

            if (!message.member.hasPermission(permission)) {
                invalidPerms.push(permission);
            }
        }

        if (invalidPerms.length) {
            return message.channel.send(`You don't have permission to use this command! Missing permissions: ${invalidPerms.join(", ")}`);
        }
    }

    // if cooldowns map doesn't have a command.name key then create one
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = command.cooldown * 1000;

    // if timestaps has a key with the author's id then check the expiration time to send a message to a user
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (current_time < expirationTime) {
            const timeLeft = (expirationTime - current_time) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // if the author's id is not in timestamps then add them with the current time
    timestamps.set(message.author.id, current_time);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}

try{
    command.execute(message, args, cmd, client, Discord, profileData);
} catch(err) {
    console.log(err);
    message.reply("there was an error trying to execute that command!");
}