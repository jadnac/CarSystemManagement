const { register, login, UserAllow } = require("../services/auth.service")
const mailerConfig = require("../emails/mailer.config")

module.exports = {
    Register: async (req, res) => {
        try {
            const data = req.body
            await register(data).then(response => {
                if (response.error) {
                    return res.status(400).send({ error: response?.error })
                } else {
                    console.log(response?.email)
                    let mailOptions = {
                        from: `Jad Nacouzi<${process.env.GMAIL}`,
                        to: response?.email,
                        subject: "Welcome Email",
                        html: '<b>Welcome to Car System Management</b>'
                    }
                    mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
                        console.log(resp)
                        if (err) {
                            return res.status(400).send({ status: 400, error: err })
                        } else {
                            return res.status(200).send({ status: 200, message: "User Successfully Registered" })
                        }
                    })
                }
            })
        } catch (err) {
            console.log('Error In Register Controller' + err)
        }
    },
    login: async (req, res) => {
        try {
            const data = req.body
            await login(data).then(response => {
                if (response?.error) {
                    return res.status(400).send({ error: response.error })
                } else {
                    return res.status(200).send({ data: response, message: "Logged in Successfully", status: 200 });
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    disEnabUser: async (req, res) => {
        try {
            const data = req.body
            await UserAllow(data).then(response => {
                if (response?.error) {
                    return res.status(400).send({ error: response?.error })
                } else {
                    return res.status(200).send({ message: 'User was Modified Succesfully', status: 200 })
                }
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    },
    
}