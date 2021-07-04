const mongoose = requires('mongoose');

const KanbanBoardSchema = mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: String,
    creator: { userId: Number, required: true },
    members: [{ userId: Number, required: true }],
    lists: [{
        title: { type: String, required: true },
        cards: [{
            title: String,
            description: String,
            githubLink: String,
            labels: [ String ]
        }]
    }]
});

//In future could add creationDate and lastAccessedDate field to track when boards are unused and delete them after a period of time.

module.exports('KanbanBoards', KanbanBoardSchema);