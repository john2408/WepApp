const express = require('express');
const router = express.Router();
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

module.exports = router;
