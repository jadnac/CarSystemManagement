const jwt = require('jsonwebtoken');
const User = require('../models/users.models')


const authenticateTokenAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ message: 'Not authenticated 1' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, async (err, userInfo) => {
    if (err) {
      return res.status(401).json({ message: 'Not authenticated 2' });
    }
    console.log(userInfo)
    let admins = await User.find({})
    const user =  admins.filter(admin => admin.email=== userInfo.email)

    if (!user.length > 0) return res.status(401).json({ message: 'Not Found' });
    req.user = user;
    return next();
  });
};
module.exports = {
  authenticateTokenAdmin,
};
