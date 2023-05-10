const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: String, required: true },
    token: { type: String, required: true }
});

module.exports = mongoose.model("tokens", tokenSchema);