const express = require('express');
const router = express.Router();


// Log out of session and then go to login page.
router.get('/', (req, res) => {
    res.render('board.ejs');
});


module.exports = router;