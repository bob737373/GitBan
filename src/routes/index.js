const path = require('path');
const express = require('express');
const router = express.Router();
const authcheck = require('../scripts/authcheck');


// Get home page
router.get('/',authcheck.checkAuth, (req, res) => {
    res.render('index.ejs', { userId: req.user._id });
});


module.exports = router;