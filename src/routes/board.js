const express = require('express');
const router = express.Router();
const KanbanBoard = require('../models/kanbanboard.js');
const User = require('../models/user.js');
const authcheck = require('../scripts/authcheck.js');


// Redirects to make a new board
router.get('/', authcheck.checkAuth, (req, res) => {
    res.redirect('/myboards/new');
});


// Go to a specific board
router.get('/:id', authcheck.checkAuth, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const boardId = req.params.id;
    const board = await KanbanBoard.findById(boardId);
    const userBoards = user.boards;
    if(userBoards.includes(boardId) || board.members.includes(userId)) {
        res.render('board.ejs', { board: board });
    } else {
        res.redirect('/myboards');
    }
});


// Deletes the specified board
router.delete('/:id', authcheck.checkAuth, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const boardId = req.params.id;
    const board = await KanbanBoard.findById(boardId);
    if(userBoards.includes(boardId)) {
        await res.board.delete()
    }
    res.redirect('/myboards');
});


module.exports = router;