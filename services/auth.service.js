const { generateAccessToken, generateAccessTokenAdmin } = require('../helpers/jwt.helper');
const User = require('../models/users.models')
module.exports = {
  async register(data) {
    try {
      let user = await User.findOne({ email: data?.email });
      if (user) {
        return { error: "Email Already Exist!! Enter a Different Email" }
      } else {
        data = {
          full_name: data?.full_name,
          email: data?.email,
          password: data?.password,
          role: 'user'
        }
        const newUser = await User.create(data);
        return (data = {
          full_name: newUser?.full_name,
          email: newUser?.email,
          role: newUser?.role
        });
      }
    } catch (err) {
      console.log("Error In Register Services " + err)
    }
  },
  async login(data){
    try {
      let user = await User.findOne({ email: data?.email });
      if (user) {
        if (data?.password === user?.password) {
          let loginResp = {
            full_name: user?.full_name,
            email: user?.email,
            role: user?.role
          }
        if(loginResp?.role === "Admin"){
          console.log('first')
          const access_token = generateAccessTokenAdmin(loginResp)
          return { loginResp, access_token };
        }else{
          const access_token = generateAccessToken(loginResp)
          return { loginResp, access_token };
        }
        } else {
          return { error: "Invalid Passwword, please try again with a different password. If Error persists please contact customer support" }
        }
        // if (!bcrypt.compareSync(data.password, user.password)) {
        //   return { error: 'Invalid creadentials.' }
        // }
      } else {
        return { error: 'Invalid user, email not found Create an Account' }
      }
    } catch (err) {
      console.log('login ERROR ' + err);
    }
  },

  async UserAllow(data){
    try {
        let user = await User.updateOne({ email: data?.email }, { $set: { isDisabled: data?.isDisabled } })
          return user
    } catch(err){
      console.log('Error User Allow Service ' + err)
    }
  }
}