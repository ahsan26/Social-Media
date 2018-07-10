const Message = require('../Models/chat');

module.exports = {
    send: async function (req, res) {
        const conversations = await Message.find();
        if (conversations.length) {
            // If conversations are already exists
            console.log(3333333333333333);
            
        } else {
            console.log(124214314312);
            // If none conversations are found
            const newConversation = new Message(
                {
                    chatters: [req.userId, req.body.friendId],
                    messages: [
                        { txt: req.body.message, userId: req.userId }
                    ]
                }
            );
            newConversation.save(function (err) {
                if (err) return res.status(400).json({ status: false, err });
                res.status(200).json({ status: true })
            });
        }
    }
};