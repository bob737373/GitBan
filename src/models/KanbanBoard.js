const mongoose = requires('mongoose');

const KanbanBoardSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    creator: {
        userId: Number
    }
});

//In future could add creationDate and lastAccessedDate field to track when boards are unused and delete them after a period of time.

module.exports('KanbanBoards', KanbanBoardSchema);