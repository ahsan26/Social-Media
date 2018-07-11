const User = require('../Models/User');

module.exports = {
    findFriend: async function (req, res) {
        const foundFriend = await User.findOne({ mobileNumber: req.query.mobileNumber }, { password: 0 });
        if (!foundFriend) return res.status(400).json({ status: false, message: 'Not found any friend with this number.' });
        const currentUser = await User.findById(req.userId);
            if (currentUser.friends.indexOf(foundFriend._id) !== -1) {
                return res.status(200).json({ status: true, foundFriend, alreadyFriend: true })
        }
        res.status(200).json({ status: true, foundFriend });
    },
    addFriend: async function (req, res) {
        const foundedFriend = await User.findById(req.body.friendId);
        if (!foundedFriend) return res.status(400).json({ status: false, message: "Not found Any Friend." })
        const currentUser = await User.findById(req.userId);
        currentUser.friends.push(req.body.friendId)
        let updatedUser = currentUser;
        User.update({ _id: req.userId }, updatedUser, err => {
            if (err) return res.status(400).json({ status: false, err });
            res.status(200).json({ status: true });
        });
    }
};