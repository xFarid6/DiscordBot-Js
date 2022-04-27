const profileModel = require('../../models/profileSchema');

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        coins: 1000,
        bank: 0
    });
    profile.save();
};


/*
module.exports = async (client, discord, guildMember) => {
    const profile = await profileModel.findOne({ userID: guildMember.id });
    if (!profile) {
        const newProfile = new profileModel({
            userID: guildMember.id,
            username: guildMember.user.username,
            discriminator: guildMember.user.discriminator,
            avatar: guildMember.user.avatarURL,
            bio: '',
            serverID: guildMember.guild.id,
            coins: 1000,
            bank: 0,
            inventory: [],
        });
        newProfile.save();
    }
}

module.exports.help = {
    name: 'guildMemberAdd',
    description: '',
    usage: '',
    category: '',
    accessableby: '',
    aliases: [],
}

module.exports.config = {
    enabled: true,
    guildOnly: true,
    permlevel: 0,
    dmOnly: false,
}

module.exports.requirements = {
    client: client,
    discord: discord,
    guildMember: guildMember,
}
*/