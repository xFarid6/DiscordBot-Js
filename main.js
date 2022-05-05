/* Importing the discord.js library, creating a new Discord client, and importing the dotenv library. */
const Discord = require('discord.js');
const client = new Discord.Client({partials : ["MESSAGE", "CHANNEL", "REACTION"]});
require('dotenv').config();

/* The prefix is the character that you have to type before the command. For example, if the prefix is
`!`, you would type `!ping` to execute the ping command. The fs is the file system, which is used to
read the commands from the commands folder. */
const prefix = '!';
const fs = require('fs');

/* Loading the member counter and the commands. */
const memberCounter = require('./member_counter.js');
client.commands = new Discord.Collection();


/* Loading all the commands from the commands folder. */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
["command handler", "event handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});


/* A function that is called when the bot is ready. */
client.once('ready', () => {
    console.log('Ready!');
    memberCounter(client);
});


/* Giving the role "Member" to the user when they join the server. */
client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.find(role => role.name === 'Member');
    if (!welcomeRole) return;

    // guildMember.addRole(welcomeRole);
    guildMember.roles.add(welcomeRole);
    guildMember.send(`Welcome to the server, ${guildMember}!`);
    guildMember.guild.channels.get('723180986899246090').send(`${guildMember} has joined the server!`); // the big number is the id of the channel that you want to send the message to
});


/* Checking if the message starts with the prefix, and if it does, it will check if the command is
valid. If it is, it will execute the command. */
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'say') {
        const sayMessage = args.join(' ');
        message.delete().catch(O_o => {});
        message.channel.send(sayMessage);
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args);
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args);
    } else if (command === 'purge') {
        if (!message.member.roles.some(r => ['Admin'].includes(r.name)))
            return message.reply('Sorry, you don\'t have permissions to use this!');

        const deleteCount = parseInt(args[0], 10);

        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');

        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    } else if (command === 'youtube') {
        client.commands.get('youtube').execute(message, args);
    } else if (command === 'help') {
        client.commands.get('suggestions').execute(message, args);
    } else if (command === 'suggestions') {
        client.commands.get('suggestions').execute(message, args);
    } else if (command === 'poll') {
        client.commands.get('poll').execute(message, args);
    } else if (command === 'image') {
        client.commands.get('image').execute(message, args);
    } else if (command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args);
    } else if (command === 'ticket') {
        client.commands.get('ticket').execute(message, args);
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args);
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args);
    } else if (command === 'weather') {
        client.commands.get('weather').execute(message, args);
    } else if (command === 'beg') {
        client.commands.get('beg').execute(message, args);
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
    }
});


/* Logging the bot into the Discord server. */
client.login(process.env.DISCORD_TOKEN);
