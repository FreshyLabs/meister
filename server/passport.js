const passport      = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const db     = require( './db' );
const config = require( './config' );

const strategy = new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://'+config.host+'/auth/github/callback'
  }, 
function(accessToken, refreshToken, profile, done) {
  // profile has all the information from the user
  function createUser() {
    return db.User.create({
      githubId: profile.id,
      profile
    });
  }

  return db.User.findOne( { githubId: profile.id } )
    .then( user => {
      if ( !user ) {
        return createUser();
      } else {
        return user;
      }
    }, createUser )
    .then( user => done( null, user ), done );
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(idOrObject, done) {
  if ( typeof idOrObject !== 'string' )
    db.User.findOne( { _id: idOrObject._id }, done );
  else
    db.User.findById( idOrObject, done );
});

module.exports = strategy;
