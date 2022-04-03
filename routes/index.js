const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Import Product Models
const Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.find(function(err, docs) { 

    let productChunk = [];
    let chunkSize = 3;


    console.log("Trying to get data");
    for (let i = 0; i < docs.length; i += chunkSize){
      console.log(docs[0]);
      console.log(docs[1]);
      productChunk.push(docs.slice(i, i + chunkSize));
      console.log(productChunk[0][0].imagePath);
    };
    
    res.render('shop/index', { title: 'Martinas Shop', 
    products: productChunk }); 
  
  }).lean();
  
});



// Push selected products
router.get('/add-to-cart/:id', function (req, res, next) {

  let productId = req.params.id;

  // Get cart object, if not available return empty dict
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product){

    // Check for errors
    if (err){
      return res.redirect('/');
    }

    // Add new Items
    cart.add(product, product.id);

    // Update cart in user's session
    req.session.cart = cart;

    console.log(cart);

    // Redirect to products' page
    res.redirect('/');

    // Render Product Description page
    //res.render('shop/product-personalize', {});

    
  });


});


router.get('/shopping-cart/', function(req, res, next){
  if (!req.session.cart){
    return res.render('shop/shopping-cart', {products:null});
  }

  let cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products: cart.generateArray() , 
                                    totalPrice: cart.totalPrice});

});

router.get('/checkout', function(req, res, next) {

  if (!req.session.cart){
    return res.redirect('shop/shopping-cart');
  }
  let cart = new Cart(req.session.cart);

  res.render('shop/checkout', {total: cart.totalPrice})

});

router.get('/send-order', function(req, res, next) {

  if (!req.session.cart){
    return res.redirect('shop/shopping-cart');
  }

  let cart = new Cart(req.session.cart);

  res.render('shop/send-order', {total: cart.totalPrice})

});

router.get('/customize', function(req, res, next) {

  if (!req.session.cart){
    return res.redirect('shop/shopping-cart');
  }

  let cart = new Cart(req.session.cart);

  res.render('shop/customize', {total: cart.totalPrice})

});


module.exports = router;
