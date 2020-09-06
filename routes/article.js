'use strict'
var express= require('express');
//Upload
var multipart =require('connect-multiparty');
var md_upload= multipart({uploadDir:'./upload/article'})//midleware es lo que nos da
//fin del upload

var ArticleController=require('../controllers/article');
var router= express.Router();
//Rutas de Prueba
router.get('/test-de-controllador',ArticleController.test);
router.post('/datos-curso',ArticleController.DatosCurso);

// Rutas articulo y sus metodos 
router.post('/save',ArticleController.save);
router.get('/articles/:last?',ArticleController.getArticles);
router.get('/article/:id',ArticleController.getArticle);
router.put('/article/:id',ArticleController.update);
router.delete('/article/:id',ArticleController.delete);
router.post('/image-upload/:id',md_upload, ArticleController.upload);
router.get('/get-image/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);
module.exports=router;


