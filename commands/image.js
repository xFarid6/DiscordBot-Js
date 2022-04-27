var Scraper = require('images-scraper');
// var google = new Scraper.Google();

const google = new Scraper({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});


module.exports = {
    name: 'image',
    description: 'Sends an image of a specified user.',
    async execute(message, args) {
        /*
        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('You need to mention a user!');
        }
        const avatar = user.displayAvatarURL;
        const embed = new Discord.RichEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatar)
            .setColor('#0099ff')
            .setFooter('Powered by https://avatars.io/');
        message.channel.send(embed);
        */
        const image_query = args.join(' ');
        if (!image_query) {
            return message.channel.send('You need to specify a search query!');
        }

        const image_result = await google.scrape(image_query, 1);
        message.channel.send(image_result[0].url);
    }
}