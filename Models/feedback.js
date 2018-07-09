const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedBackSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('FeedBack', FeedBackSchema);