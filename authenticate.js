var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
//takes the user information using session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());