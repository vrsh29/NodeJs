var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
//takes the user information using session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// create jwt token
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, 
    {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if(err) {
                return done(err, false);
            }
            else if(user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // verifies secret and checks exp
  jwt.verify(token, config.secretKey, function(err, decoded) {
    if (err) {
      var err = new Error("You are not authenticated!");
      err.status = 401;
      return next(err);
    } else {
      // They are an admin
      if (decoded._doc.admin) {
        return next();
      } else {
        // They are not an admin
        var err = new Error(
          "You are not authorized to perform this operation!"
        );
        err.status = 403;
        return next(err);
      }
    }
  });
};
// exports.verifyAdmin = (req, res, next) => {
//        if (req.user.admin == true) {
//          console.log("Admin verified.");
//          next();
//        } else {
//          var err = new Error("You are not authorized to perform this operation!");
//          err.status = 403;
//          next(err);
//        }
//   }

