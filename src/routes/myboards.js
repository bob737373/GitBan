const express = require('express');
const router = express.Router();
const KanbanBoard = require('../models/kanbanboard.js');
const User = require('../models/user.js');


// Log out of session and then go to login page.
router.get('/', async (req, res) => {
    const user = User.findById(req.user._id);
    const boardsList = user.boards;
    const boards = [];
    for(let i in boardsList) {
        const board = KanbanBoard.findById(boardsList[i].boardId);
        boards.push(board);
    }
    res.render('myboards.ejs', { boards: boards });
});


module.exports = router;