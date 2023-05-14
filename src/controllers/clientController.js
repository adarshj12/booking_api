const jwt = require('jsonwebtoken')
require('dotenv').config()
const { 
    emailvalidate, 
    nameValidate, 
    mobileValidate, 
    passwordValidate 
} = require('../utils/signupvalidate');
const { 
    signup, 
    signin 
} = require('../helpers/clientHelpers');


const register = async ({username,email,mobile,password}) => {
    if (!nameValidate(username) || !emailvalidate(email) || !mobileValidate(mobile) || !passwordValidate(password)) return {invalidCredentials:true};
    const user = await signup(username,email,mobile,password);
    if (user.userExist) return { userExist: true };
    return true
}

const login = async ({ email, password }) => {
    const user = await signin(email, password);
    if (user.notExist) return { notExist: true };
    if (user.notMatch) return { notMatch: true };
    if (user.blocked) return { blocked: true };
    const { id, name, mobile } = user;
    const token = jwt.sign({ id, name, mobile, user: true }, process.env.SECRET, { expiresIn: "10h" });
    return {token};
  };

module.exports = {
    register,
    login
}