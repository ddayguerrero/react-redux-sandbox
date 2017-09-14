const passport = require('passport');
const User = require('../models/user');
const config = require('../config');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({ email: email }, function(err, user){
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user); // supplied by passport and provides user model
    });
  });
});

// JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  User.findById(payload.sub, function(err, user){
    if (err) { return done(err,false); };

    if (user) {
      done(null, user); // User found
    } else {
      done(null, false); // No user found
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);