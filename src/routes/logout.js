const express = require('express');
const router = express.Router();


// Log out of session and then go to login page.
router.get('/', (req, res) => {
    req.logOut();
    res.redirect('/login');
});


module.exports = router;