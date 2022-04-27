const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
const fs = require('fs');

const memberCounter = require('./member_counter.js');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Ready!');
    memberCounter(client);
});


client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.find(role => role.name === 'Member');
    if (!welcomeRole) return;

    // guildMember.addRole(welcomeRole);
    guildMember.roles.add(welcomeRole);
    guildMember.send(`Welcome to the server, ${guildMember}!`);
    guildMember.guild.channels.get('723180986899246090').send(`${guildMember} has joined the server!`); // the big number is the id of the channel that you want to send the message to
});


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
        message.channel.send('```!ban @user reason\n!kick @user reason\n!purge number\n!say message\n!youtube search\n!ping```');
    } else if (command === 'suggestions') {
        client.commands.get('suggestions').execute(message, args);
    }
});


client.login("OTY4NzczMDg3ODg3NzY5NjQw.YmjuPw.FWqWgr-evXH-02WAC-OMTxTYQzI");
