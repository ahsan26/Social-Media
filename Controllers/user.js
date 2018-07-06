const User = require('../Models/User');
const JWT = require('jsonwebtoken');

module.exports = {
    signUp: async function (req, res) {
        console.log(req.body);
        const newUser = await new User({ ...req.body });
        newUser.save(async function (err, data) {
            if (err) return res.status(400).json({ status: false, err });
            const token = await JWT.sign({ userId: newUser._id },'secretKey');
            res.status(200).json({ status: true, token })
        });
    },
    signIn: async function (req, res) {
        const { mobileNumber, password } = req.body;
        const foundUser = await User.findOne({ mobileNumber });
        if (!foundUser) return res.status(400).json({ status: false, message: "Your account is not found with given credentials." });
        if (foundUser.isValidPassword(password)) {
            const token = await JWT.sign({ userId: foundUser._id },'secretKey');
            res.status(200).json({ status: true, token });
        } else {
            res.status(400).json({ status: false, message: "Password is Incorrect!" });
        }
    }
};