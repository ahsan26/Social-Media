const Message = require('../Models/chat');

module.exports = {
    send: async function (req, res, next, io, users) {
        const conversations = await Message.find();
        if (conversations.length) {
            // If conversations are already exists
            let foundedConverstations = await conversations.find((item, i) => {
                return item.chatters.indexOf(req.userId) !== -1 && item.chatters.indexOf(req.body.friendId) !== -1;
            })
            if (!foundedConverstations) {
                const newMsg = { txt: req.body.message, userId: req.userId };
                const newConversation = new Message(
                    {
                        chatters: [req.userId, req.body.friendId],
                        messages: [
                            newMsg
                        ]
                    }
                );
                newConversation.save(async function (err) {
                    if (err) return res.status(200).json({ status: false, err });
                    const foundedFriendInfo = await users.find(item => item.userId === req.body.friendId);
                    // If foundFriends is undefined it's mean that the other friend is not online
                    const currentUser = await users.find(item => item.userId == req.userId);
                    if (foundedFriendInfo) {
                        io.sockets.connected[currentUser._id].emit("message", newMsg);
                        io.sockets.connected[foundedFriendInfo._id].emit("message", newMsg);
                    }
                    else {
                        io.sockets.connected[currentUser._id].emit("message", newMsg);
                    }
                    return res.end();
                });
            }
            const newMsg = {
                userId: req.userId,
                txt: req.body.message
            };

            foundedConverstations.messages.push(newMsg);
            Message.update({ _id: foundedConverstations.id }, foundedConverstations, async function (err) {
                if (err) return res.status(400).json({ status: false, err });
                // res.status(200).json({ status: true });
                const foundedFriendInfo = await users.find(item => item.userId === req.body.friendId);
                // If foundFriends is undefined it's mean that the other friend is not online
                const currentUser = await users.find(item => item.userId == req.userId);
                if (foundedFriendInfo) {
                    console.log(currentUser, foundedFriendInfo);
                    io.sockets.connected[currentUser._id].emit("message", newMsg);
                    io.sockets.connected[foundedFriendInfo._id].emit("message", newMsg);
                }
                else {
                    io.sockets.connected[currentUser._id].emit("message", newMsg);
                }
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