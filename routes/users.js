var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');


var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req,res,next) => {
  User.register(new User({username: req.body.username}), 
  req.body.password, (err,user) => {
    if(err) {
    res.statusCode = 5;
    res.setHeader('Content-type','application/json');
    res.json({err: err});
    }
    else {
       passport.authenticate('local')(req,res, () => {
      res.statusCode = 200;
      res.setHeader('Content-type','application/json');
      res.json({success: true, status: 'Registration Successful'});
      });
    }
  })
});

router.post('/login', passport.authenticate('local'), (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    res.json({success: true, status: 'You are Successfully logged in'});
})

//removes session from server-side & delete cookie from client side
router.get('/logout',(req,res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in');
    err.statusCode = 403;
    next(err);
  }
});

module.exports = router;
