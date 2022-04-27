const weather = require('weather-js');
const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Check the weather.",
    aliases: ["w", "wea", "weat", "weater", "weather"],
    usage: "weather",
    cooldown: 5,
    guildOnly: false,
    execute(message, args, client) {

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
            if (err) message.channel.send(err);

            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a location!**')
                return;
            }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
                .setTitle(`Weather for ${current.observationpoint}`)
                .setDescription(`**Temperature:** ${current.temperature}°C\n**Feels Like:** ${current.feelslike}°C\n**Winds:** ${current.winddisplay}`)
                .setColor("#0099ff")
                .addField("Timezone", `UTC${location.timezone}`, true)
                .addField("Humidity", `${current.humidity}%`, true)
                .addField("Visibility", `${current.visibility}km`, true)
                .addField("Sunrise", `${current.sunrise}`, true)
                .addField("Sunset", `${current.sunset}`, true)
                .addField("Weather", `${current.skytext}`, true)
                .addField("Feels Like", `${current.feelslike}°C`, true)
                .addField("Dew Point", `${current.dewpoint}°C`, true)
                .addField("Winds", `${current.winddisplay}`, true)
                .addField("Pressure", `${current.pressure}hPa`, true)
                .addField("Precipitation", `${current.precip}mm`, true)
                .addField("Cloudcover", `${current.cloudcover}%`, true)
                .addField("Observation Time", `${current.observationtime}`, true)
                .addField("Observation Point", `${current.observationpoint}`, true)
                .setThumbnail(current.imageUrl)
                .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL());
            message.channel.send(embed);
            message.channel.send(`**Temperature:** ${current.temperature}°C\n**Feels Like:** ${current.feelslike}°C\n**Winds:** ${current.winddisplay}`);
        });
    }
}