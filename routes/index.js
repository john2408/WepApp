const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Product = require('../models/product');


let csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.find(function(err, docs) { 

    let productChunk = [];
    let chunkSize = 3;
    
    for (let i = 0; i < docs.length; i += chunkSize){
      //console.log(docs[0]);
      //console.log(docs[1]);
      productChunk.push(docs.slice(i, i + chunkSize));
      console.log(productChunk[0][0].imagePath);
    };
    
    res.render('shop/index', { title: 'Martinas Shop', 
    products: productChunk }); 
  
  }).lean();
  
});

// Get crsf token from User section to proctect it
router.get('/user/signup', function(req, res, next){
  res.render('user/signup',{crsfToken: req.csrfToken()});
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next){
  res.render('user/profile')
})


module.exports = router;
