const GitHubStrategy = require('passport-github').Strategy;

function initPassport(passport, getUserById) {
    passport.use(new GitHubStrategy({ 
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
      }, 
      (accessToken, refreshToken, profile, cb) => {
          isSecureContext.findOrCreate(
              { githubId: profile.id }, 
              (err, user) => {
                return cb(err, user);
              }
          );
      }
    ));

    //supply user id
    passport.serializeUser((user, done) => { done(null, user.id) });

    //query user record by id
    passport.deserializeUser((id, done) => { 
        return done(null, getUserById(id))
     });
}

module.exports = initPassport;