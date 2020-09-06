//constructores de los articulos class para tener objetos 
'use strict'
var mongoose= require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    title:String,
    content:String,
    date:{type:Date,
        default:Date.now},
    image:String
});

module.exports = mongoose.model('Article',ArticleSchema);

//coleccion de articles-->guarda documentos con esta estructura en la colección
