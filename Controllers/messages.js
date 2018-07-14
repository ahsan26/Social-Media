const Message = require('../Models/chat');

module.exports = {
    send: async function (req, res, next, io, users) {
        console.log(io.sockets.id, io.sockets._id)
        const conversations = await Message.findOne({ $or: [{ chatters: [req.userId, req.body.friendId] }, { chatters: [req.body.friendId, req.userId] }] });
        if (conversations) {
            // This scenario is just for the conversation which was saved in the database
            conversations.messages.push({ txt: req.body.message, userId: req.userId });
            Message.update({ _id: conversations._id }, conversations, async function (err) {
                if (err) return res.status(400).json({ status: false, err })
                const foundFriendInfo = await users.find(item => item.userId === req.body.friendId);
                const currentuserfoundInfo = await users.find(item => item.userId == req.userId);
                const data = { txt: req.body.message, userId: req.userId };
                console.log(foundFriendInfo, currentuserfoundInfo, users);
                if (foundFriendInfo) {
                    io.sockets.connected[foundFriendInfo._id].emit("message", data);
                    io.sockets.connected[currentuserfoundInfo._id].emit("message", data);
                } else {
                    io.sockets.connected[currentuserfoundInfo._id].emit("message", data);
                }
                res.end();
            });
        } else {
            // This scenerio is just for the new conversation that doesn't exists in the database
            const newMsg = { txt: req.body.message, userId: req.userId };
            const newConversation = new Message({
                chatters: [req.userId, req.body.friendId], messages: [
                    newMsg
                ]
            });
            newConversation.save(async function (err) {
                if (err) return res.status(200).json({ status: false, err });
                const foundFriendInfo = await users.find(item => item.userId === req.body.friendId);
                const currentuserfoundInfo = await users.find(item => item.userId === req.userId);
                if (foundFriendInfo) {
                    io.sockets.connected[foundFriendInfo._id].emit("message", data);
                    io.sockets.connected[currentuserfoundInfo._id].emit("message", data);
                } else {
                    io.sockets.connected[currentuserfoundInfo._id].emit("message", data);
                }
                res.end();
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