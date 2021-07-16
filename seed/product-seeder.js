const Product = require('../models/product');
const mongoose = require('mongoose');


const MONGO_DB_USER  = 'johntorresmaster';
const MONGO_DB_PASSWORD = '';

var MONGO_URL = "mongodb+srv://clustermartinas.cbu5s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
  auth: {
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD
  },
   useNewUrlParser: true , 
   useUnifiedTopology : true
});

const products = [
    
    new Product({
        imagePath: "images/1.jpg",
        title: "Desayuno sorpresa Dinosaurio",
        description: "Desayuno sorpresa estilo dinosaurio.",
        price: 55000
    }),

    new Product({
        imagePath: "images/2.jpg",
        title: "Desayuno sorpresa Deluxe",
        description: "Desayuno sorpresa con globo, tarjeta y fotos personalizadas.",
        price: 55000
    }),

];

let done = 0;

for (var i = 0; i < products.length; i++){
    products[i].save( function(err, results){
        done++;
        if (done === products.length){
            exit();
        }

    });
};

function exit(){
    mongoose.disconnect()
};

