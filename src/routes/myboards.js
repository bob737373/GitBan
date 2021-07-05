const express = require('express');
const router = express.Router();
const KanbanBoard = require('../models/kanbanboard.js');
const User = require('../models/user.js');
const authcheck = require('../scripts/authcheck.js');


// Load in my boards
router.get('/', authcheck.checkAuth, async (req, res) => {
    const user = User.findById(req.user._id);
    const boardsList = user.boards;
    const boards = [];
    for(let i in boardsList) {
        const board = KanbanBoard.findById(boardsList[i]);
        boards.push(board);
    }
    res.render('myboards.ejs', { boards: boards });
});


// Create a new board
router.post('/new', authcheck.checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user.boards.length >= 25) {
        res.render('boardcreatefail.ejs');
    }
    const newBoard = await new KanbanBoard({
        title: 'untitled',
        creatorId: user._id,
        members: user._id,
        lists: [{
            title: 'Example List',
            cards: [{
                title: 'Example Card',
                description: 'Describe your card here.',
                githublink: 'https://github.com/bob737373/GitBan',
                labels: [ 'Example' ]
            }]
        }]
    }).save();
    user.boards.push(newBoard._id);
    res.redirect(`/board/${newBoard._id}`);
});


module.exports = router;