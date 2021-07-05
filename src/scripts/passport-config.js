const GitHubStrategy = require('passport-github2').Strategy;
const getuser = require('./getuser');

function initPassport(passport, getUserById) {
    
  let user;

  passport.use(new GitHubStrategy({ 
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/auth/github/callback"
      }, 
      (accessToken, refreshToken, profile, done) => {
        const ghid = profile.id;
        user = getuser.findOrCreateUserByGitHubProfile(profile);
        
        return done(null, user);
      }
    ));

    //supply user id
    passport.serializeUser((user, done) => { 
      done(null, user._id) 
    });

    //query user record by id
    passport.deserializeUser((id, done) => { 
      done(null, getuser.getUserById(id))
    });
}

module.exports = initPassport;