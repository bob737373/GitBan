const mongoose = requires('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    deviceCode: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    avatar: String
});

module.exports = mongoose.model('Users', UserSchema);