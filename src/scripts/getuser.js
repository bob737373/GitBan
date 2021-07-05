const User = require('../models/user');


async function getUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch(err) {
        console.log(err);
        return null;
    }
}

async function getUserByGitHubId(ghid) {
    try {
        const user = await User.findOne({ ghid: ghid });
        return user;
    } catch(err) {
        console.log(err);
        return null;
    }
}

async function findOrCreateUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch(err) {
        console.log(err);
        return null;
    }
}

async function findOrCreateUserByGitHubProfile(profile) {
    let user;
    try {
        user = await User.findOne({ ghid: profile.id });
    } catch(err) {
        console.log(err);
        return null;
    }
    if(!user) {
        const user = new User({ 
            ghid: profile.id
        });
    
        try {
            const newUser = await user.save();
            return newUser;
        } catch(err) {
            console.log(err);
            return null;
        }
    }
    return user;
}


module.exports = { 
    getUserById, 
    getUserByGitHubId, 
    findOrCreateUserById, 
    findOrCreateUserByGitHubProfile
};