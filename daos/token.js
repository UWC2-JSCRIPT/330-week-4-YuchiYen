// makeTokenForUserId(userId) - should be an async function that returns a string after creating a Token record

// getUserIdFromToken(tokenString) - should be an async function that returns a userId string using the tokenString to get a Token record

// removeToken(tokenString) - an async function that deletes the corresponding Token record
const { v4: uuidv4 } = require('uuid');
const Token = require('../models/token');
const token = require('../models/token');

module.exports = {};

module.exports.makeTokenForUserId = async (userId) => {
    const tokenString = uuidv4();
    const token = new Token({ token: tokenString, userId: userId });

    await Token.create(token);
    return tokenString;
}

module.exports.getUserIdFromToken = async (tokenString) => {
    const token = await Token.findOne({ token: tokenString });

    if (token) {
        return token.userId;
    } else {
        return null;
    }
}

module.exports.removeToken = async (tokenString) => {
    return await Token.findOneAndDelete({ token: tokenString })
        .then(async (deletedDocument) => {
            if (deletedDocument) {
                return true
            }
            else
                return false
        });
}


