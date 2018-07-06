const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 10,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
         required: true
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    mobileNumber: {
        type: Number,
        minlength: 11,
        unique: true,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
});

UserSchema.methods['isValidPassword'] = async function (newPW) {
    try {
        return await bcryptjs.compare(newPW, this.password);
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = mongoose.model('User', UserSchema);