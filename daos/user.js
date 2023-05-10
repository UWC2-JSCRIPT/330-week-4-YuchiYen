// createUser(userObj) - should store a user record
// getUser(email) - should get a user record using their email
// updateUserPassword(userId, password) - should update the user's password field

const User = require('../models/user');

module.exports = {};

module.exports.createUser = async (userObj) => {
    const user = new User({ email: userObj.email, password: userObj.password});
    await User.create(user);
    return user;
}

module.exports.getUser = async (email) => {
    var result = await User.findOne({ email: email });
    return result;
}

module.exports.updateUserPassword = async (userId, hashedPassword) => {    
    return User.updateOne({ _id: userId }, { password: hashedPassword });
}

