const express = require('express');
const router = express.Router();
const User = require('../models/user');


// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message});
    }
});


// Get a user
router.get('/:id', getUser, (req, res) => {
    res.status(200).json(res.user); //200 for everything is good
});


// Create a User
// router.post('/', async (req, res) => {

//     const user = new User({ 
//         ghid: req.body.GitHubId,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName
//     });

//     try {
//         const newUser = await user.save();
//         res.status(201).json(newUser); //201 means creation of object was successful
//     } catch(err) {
//         res.status(400).json({ message: err.message });
//     }
// });


// Update a user's information
router.patch('/:id', getUser, async (req, res) => { //using patch instead of put since we only want to update the information the user provides, put updates all information
    if(req.body.firstName) {
        res.user.firstName = req.body.firstName;
    }
    if(req.body.lastName) {
        res.user.lastName = req.body.lastName;
    }
    try {
        const updatedUser = await res.user.save();
        res.status(204).json(updatedUser); //204 for resource updated successfully
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.status(204).json({ message: `Deleted user with id ${req.params.id}` }); //204 for resource deleted successfully
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});


async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id).exec();
        if(!user) {
            return res.status(404).json({ message: 'Cannot find user' }); //404 is could not find status
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}


module.exports = router;