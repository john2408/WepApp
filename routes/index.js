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

route.get('/add-to-cart/:id', function (req, res, next) {
  let productID = req.params.id;
  // Get cart object, if not available return empty dict
  let cart = new Cart(req.session.cart ? req.sesssion.cart : {})

  Product.findById(productId, function(err, product){

    // Check fore errors
    if (err){
      return res.redirect('/');
    }

    // Add new Items
    cart.add(product, product.id);

    // Update cart in user's session
    req.session.cart = cart;

    console.log(cart)

    res.redirect('/');

  });

});

module.exports = router;
