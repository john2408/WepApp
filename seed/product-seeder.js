const Product = require('../models/product');
const mongoose = require('mongoose');
const connectDB = require('../config/db');


connectDB();

let products = [
    
    new Product({
        imagePath: "images/3.jpg",
        title: "Merienda Sorpresa dorado",
        description: "Merienda sorpresa con fruta.",
        price: 75000
    }),

    new Product({
        imagePath: "images/4.jpg",
        title: "Merienda Sorpresa Hombre",
        description: "Merienda Sorpresa estilo plateado y azúl.",
        price: 65000
    }),

    new Product({
        imagePath: "images/5.jpg",
        title: "Merienda Sorpresa Soldado",
        description: "Merienda Sorpresa estilo soldado.",
        price: 55000
    }),

    new Product({
        imagePath: "images/6.jpg",
        title: "Pequena merienda sorpresa Graduación",
        description: "Merienda sorpresa para graduación.",
        price: 65000
    }),

];

let done = 0;

for (let i = 0; i < products.length; i++){
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

