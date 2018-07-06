const User = require('../Models/User');

module.exports = {
    findFriend: async function (req, res) {
        const foundFriend = await User.findOne({ mobileNumber: req.query.mobileNumber }, { password: 0 });
        if (!foundFriend) return res.status(400).json({ status: false, message: 'Not found any friend with this number.' });
        res.status(200).json({ status: true, friend: foundFriend });
    },
        addFriend: async function(req,res){
            const foundedFriend =await User.findById(req.body.friendId);
            if(!foundedFriend)return res.status(400).json({status:false, message:"Not found Any Friend."})
            
    }
};