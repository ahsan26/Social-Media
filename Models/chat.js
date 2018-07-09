const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chatters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        txt: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Chats', MessageSchema);