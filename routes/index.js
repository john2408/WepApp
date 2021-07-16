var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.find(function(err, docs) { 

    var productChunk = [];
    var chunkSize = 3;
    
    for (var i = 0; i < docs.length; i += chunkSize){
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
