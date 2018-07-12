const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description: {
        type:String
    },
    img: {
        type:String
    }
});

module.exports = mongoose.model('Posts', PostSchema);