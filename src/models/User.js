const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //_id property generated automatically by default
    ghid: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    avatar: String,
    private: {
        type: Boolean,
        required: true,
        default: true
    },
    boards: [{ boardId: String }]
});

module.exports = mongoose.model('user', userSchema);