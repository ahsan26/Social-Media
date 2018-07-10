const User = require('../Models/User');
const JWT = require('jsonwebtoken');
const FeedBack = require('../Models/feedback');
module.exports = {
    signUp: async function (req, res) {
        const newUser = await new User({ ...req.body });
        console.log(13213321);
        newUser.save(async function (err, data) {
            if (err) return res.status(400).json({ status: false, err });
            const token = await JWT.sign({ userId: newUser._id }, 'secretKey');
            res.status(200).json({ status: true, token })
        });
    },
    signIn: async function (req, res) {
        const { mobileNumber, password } = req.body;
        const foundUser = await User.findOne({ mobileNumber });
        if (!foundUser) return res.status(400).json({ status: false, message: "Your account is not found with given credentials." });
        if (foundUser.isValidPassword(password)) {
            const token = await JWT.sign({ userId: foundUser._id }, 'secretKey');
            res.status(200).json({ status: true, token });
        } else {
            res.status(400).json({ status: false, message: "Password is Incorrect!" });
        }
    },
    getFriends: async function (req, res) {
        const foundUser = await User.findById(req.userId).populate('friends', 'name mobileNumber age profilePic');
        if (!foundUser) return res.status(400).json({ status: false, message: "User Not found with Given Credentials" });
        res.status(200).json({ status: true, friends: foundUser.friends });
    },
    getfeedBack: async (req, res) => {
        const newFeedBack = await new FeedBack({ message: req.body.message, userId: req.userId });
        newFeedBack.save(function (err) {
            if (err) return res.status(400).json({ status: false, err });
            res.status(200).json({ status: true });
        });
    }
};