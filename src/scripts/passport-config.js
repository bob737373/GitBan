const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
const getuser = require('./getuser');

function initPassport(passport, getUserById) {

  passport.use(
    new GitHubStrategy({ 
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/auth/github/callback"
      }, 
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOneAndDelete({ ghid: profile.id });
        if(user) {
          return done(null, user);
        } else {
          const newUser = await new User({
            ghid: profile.id
          }).save();
          return done(null, newUser)
        }
      }
    ));

    //supply user id
    passport.serializeUser((user, done) => {
      console.log(user.id); 
      done(null, user.id) 
    });

    //query user record by id
    passport.deserializeUser(async (id, done) => { 
      const user = await User.findById(id);
      done(null, user);
    });
}

module.exports = initPassport;