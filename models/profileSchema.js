const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: false, unique: false },
    discriminator: { type: String, required: false, unique: false },
    avatar: { type: String, required: false, unique: false },
    bio: { type: String, required: false, unique: false },

    serverID: { type: String, required: true, unique: false },
    coins: { type: Number, default: 1000},
    bank: { type: Number},
    // inventory: { type: Array, default: [] },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;