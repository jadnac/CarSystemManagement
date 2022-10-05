const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' })
}

const generateAccessTokenAdmin = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_ADMIN, { expiresIn: '30d' });
  };

module.exports = {
    generateAccessToken,
    generateAccessTokenAdmin
}