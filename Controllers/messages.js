const Message = require('../Models/chat');

module.exports = {
    send: async function (req, res, next, io) {
        const conversations = await Message.find();
        if (conversations.length) {
            // If conversations are already exists
            let foundedConverstations = await conversations.find((item, i) => {
                return item.chatters.indexOf(req.userId) !== -1;
            })
            const newMsg = {
                userId: req.userId,
                txt: req.body.message
            };

            foundedConverstations.messages.push(newMsg);
            Message.update({ _id: foundedConverstations.id }, foundedConverstations, function (err) {
                if (err) return res.status(400).json({ status: false, err });
                // res.status(200).json({ status: true });
                io.sockets.emit("message", newMsg);
                res.end();
            });
        } else {
            // If none conversations are found
            const newMsg = { txt: req.body.message, userId: req.userId };
            const newConversation = new Message(
                {
                    chatters: [req.userId, req.body.friendId],
                    messages: [
                        newMsg
                    ]
                }
            );
            newConversation.save(function (err) {
                if (err) return res.status(400).json({ status: false, err });
                // res.status(200).json({ status: true })
                io.sockets.broadcast.emit('message', newMsg)
                res.end()
            });
        }
    },
    messages: async function (req, res) {
        const messages = await Message.find();
        if (!messages.length) return res.status(200).json({ status: false, message: 'no messages' });
        const foundedConversation = await messages.find((item, i) => {
            return item.chatters.indexOf(req.userId) !== -1 && item.chatters.indexOf(req.query.friendId) !== -1
        });
        res.status(200).json({ status: true, messages: foundedConversation.messages, userId: req.userId });
    }
};