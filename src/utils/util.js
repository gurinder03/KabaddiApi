
const config = require('../config/config')
const jwt = require('jsonwebtoken');

module.exports.jwtToken = async(payload) =>{
    return jwt.sign({
        email: "testvwvwl",
    }, config.SECRET, { expiresIn: config.EXPIREIN });
    
}