module.exports = {
    name: "youtube",
    description: "Search YouTube",
    execute(message, args) {
        // using id of the role you want to give to the user
        if (message.member.roles.cache.has('723180986899246090')) {
            if (args.length < 1) {
                return message.channel.send('Please provide a search term.');
            }

            const query = args.join(' ');

            message.channel.send('Searching...').then(message => {
                yt.searchVideos(query, 1).then(results => {
                    const firstResult = results[0];

                    message.edit(`https://www.youtube.com/watch?v=${firstResult.id}`);
                });
            });
        } else {
            message.channel.send('You do not have permission to use this command.');
            // message.delete();
            message.channel.send('The correct permissions are being given to you.');
            message.member.roles.add('723180986899246090')
                .catch(console.error);

            message.channel.send('As easy as that, the role is now gone.');
            message.member.roles.remove('723180986899246090')
                .catch(console.error);
        }

        const query = args.join(" ");
        const url = `https://www.youtube.com/results?search_query=${query}`;
        message.channel.send(url);
    }
}