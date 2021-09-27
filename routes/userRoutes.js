const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
//const { route } = require('.');


let csrfProtection = csrf();
router.use(csrfProtection);

// Check if user is loggedin, if so redirect to user profile
router.get('/profile', isLoggedIn , function(req, res, next){
  res.render('user/profile');
})

// User Logout
router.get('/logout', isLoggedIn,  function(req, res, next){
  req.logout();
  res.redirect("/");
})

// Logout Function: Using router.use creates problems, 
// TODO: The line above should be enough
router.get('/', notLoggedIn, function(req, res, next){
  next();
});

// Using Local Sign up Strategy
// Get crsf token from User section to proctect it
router.get('/signup', function(req, res, next){
  
    let messages = req.flash('error');
    
    // Check Errors at Sign up
    // also using Csrf Token
    res.render('user/signup',{crsfToken: req.csrfToken(), 
                messages : messages, 
                hasErrors: messages.length > 0});
  });
  
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

// Using Local Sign In Strategy
router.get('/signin', function(req, res, next){

  let messages = req.flash('error');

  res.render('user/signin',{crsfToken: req.csrfToken(), 
    messages : messages, 
    hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));



module.exports = router;

// Function to protect the User Routes
// Let user navigate as long as it is authenticated
function isLoggedIn( req, res, next) {
  if( req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};

function notLoggedIn( req, res, next) {
  if( !req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
};