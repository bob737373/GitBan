const mongoose = require('mongoose');

const KanbanBoardSchema = mongoose.Schema({
    title: String,
    description: String,
    creatorId: { type: String, required: true },
    members: [{ userId: String }],
    lists: [{
        title: String,
        cards: [{
            title: String,
            description: String,
            githubLink: String,
            labels: [ String ]
        }]
    }]
});

//In future could add creationDate and lastAccessedDate field to track when boards are unused and delete them after a period of time.

module.exports = mongoose.model('KanbanBoard', KanbanBoardSchema);