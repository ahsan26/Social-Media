const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    txt: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    nestedComment: {
        type: Boolean
    },
    nestedComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});

module.exports = mongoose.model('Comments', CommentSchema);