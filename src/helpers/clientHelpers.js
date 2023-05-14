const mongoose = require('mongoose');
const Client = require('../models/clientModel');
const bcrypt = require('bcrypt');

const signup = async (username, email, mobile, password) => {
    const userExist = await Client.findOne({ email }) || await Client.findOne({ mobile })
    if (userExist) return {userExist:true}
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    const newUser = new Client({
        username,
        email,
        mobile,
        password
    })
    await newUser.save();
    return true;
}
const signin = async (email, password) => {
    const user = await Client.findOne({ email });
    if (!user) return { notExist: true };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { notMatch: true };
    if (user.isBlocked) return { blocked: true };
    return { id: user._id, name: user.username, mobile: user.mobile, client: true };
}

module.exports = {
    signup,
    signin
}