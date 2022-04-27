const util = require('minecraft-server-util');

module.exports = {
    name: "mcserver",
    description: "Check the status of a Minecraft server.",
    aliases: ["mc"],
    usage: "mcserver <ip> <port>",
    cooldown: 10,
    guildOnly: false,
    execute(message, args, cmd, client, discord, profileData) {
        /*
        if (args.length < 2) {
            return message.channel.send("Please enter an IP and port!");
        }

        const ip = args[0];
        const port = args[1];
        
        util.query(ip, port, (err, res) => {
            if (err) {
                return message.channel.send(`Error: ${err}`);
            }

            const embed = new discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Server Status")
                .setDescription(`${res.online ? "Online" : "Offline"}`)
                .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL());
            message.channel.send(embed);
        });
        */

        if (!args[0]) return message.channel.send("Please enter an IP and port!");
        if (!args[1]) return message.channel.send("Please enter a port!");

        util.status(args[0], {port: parseInt(args[1]) }).then((response) => { 
            const embed = new discord.MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Server Status")
                .setDescription(`${response.online ? "Online" : "Offline"}`)
                .addFields(
                    { name: "Version", value: response.version, inline: true },
                    { name: "Players", value: response.players.online + "/" + response.players.max, inline: true },
                    { name: "MOTD", value: response.motd, inline: true },
                    { name: "Protocol", value: response.protocol, inline: true },
                    { name: "Latency", value: response.latency, inline: true },
                    { name: 'version', value: response.version, inline: true },
                    { name: 'Max Players', value: response.players.max, inline: true },
                )
                .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL());
            message.channel.send(embed);
        })
        .catch((err) => {
            message.channel.send(`Error: ${err}`);
            throw err;
        });
    }
}