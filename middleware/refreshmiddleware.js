const jwt = require('jsonwebtoken');

module.exports = function(token, username, role){
    return function  (request, require, next) { 
        if(!token){
            next()
        }
        const refreshToken = jwt.sign()
    } 
}