module.exports = async (client) => {
    const guild = client.guilds.cache.get('723180986899246090');
    /* as gc would do it
    // check for amount of members every 5 seconds and update the counter
    setInterval(() => {
        guild.channels.cache.get('723180986899246090').setName(`Members: ${guild.memberCount}`);
    }, 5000);

    // check for new members every 5 seconds and send a message to the channel
    setInterval(() => {
        guild.channels.cache.get('723180986899246090').send(`${guild.members.cache.last()} has joined the server!`);
    }, 5000);
    */

    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('723180986899246090');
        channel.setName(`Total Members: ${memberCount}`);   
        console.log(`Total Members: ${memberCount}`);
    }, 500000);
}
