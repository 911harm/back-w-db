'use strict'
var validator=require('validator');

var fs=require('fs');
var path=require('path');
var Article= require('../models/article');
const { exists } = require('../models/article');
const { search } = require('../routes/article');

var controller={
    DatosCurso:(req,res)=>{
    var clave= req.body.clave;
    console.log(req.body.clave);
    
    return(
        res.status(200).send({
            nombre:"hector",
            apellido:"ramirez",
            feliz:true,
            clave
        })
    )
    
    },
    test: (req,res)=>{
        return res.status(200).send({
            message:'soy la accion test de controller article'
        });
    },
    save:(req,res)=>{
        // parametros
        var params =req.body;
        console.log(params);
        //validar
        try{
            var validate_t=!validator.isEmpty(params.title);
            var validate_c=!validator.isEmpty(params.content);
        }
        catch(err){
            return res.status(200).send({
                status:"error",
                message:'Error: Faltan datos '+err
            });

        }
        if(validate_t && validate_c){
            //crear objeto que guardaremos
            var article= new Article();

            //asignar valores
            article.title=params.title;
            article.content=params.content;
            article.image=params.image;
            //guardar

            article.save((err,articleStored)=>{
                if(err || !articleStored){
                    return res.status(404).send({
                        status:'Error',
                        message:'no se guardo'
                    });
                }
                else{
                    //responder
                    return res.status(200).send({
                        status:'success',
                        article: articleStored
                    })
                }
            
            });


        }//fin del if
        
        
    },//Fin del metodo save de este controlador
    getArticles:(req,res)=>{
        var query= Article.find();

        var last=req.params.last;

        if(last || last!= undefined){
            query.limit(3);

        };

       query.sort('-_id').exec((err,articles)=>{

            if(err || !articles){

                return res.status(404).send({
                 status:'404',
                 message:'no hay articulos'
             })

            };

           return res.status(200).send({
            status:'success',
            articles
        })
       });

    },//fin de getArticles

    getArticle:(req,res)=>{
        var articleId= req.params.id;
        // ok ya tengo el id ahora buscarlo y imprimirlo 
        Article.findById(articleId,(err,article)=>{
            if(err || !article){
                return res.status(404).send({
                    status:'error',
                    message:'no encontrado el articulo'
                })  
            }
        return res.status(200).send({
            status:"success",
            article
        });

        });

    },//fin de getArticle por id

    update:(req,res)=>{

        var articleId=req.params.id;
        var params = req.body;

    try{
        var validate_t=!validator.isEmpty(params.title);
        var validate_c=!validator.isEmpty(params.content);

    }
    catch{
        return res.send({
            message:'Faltan Datos '
        })
    }
    if(validate_t && validate_c){
        Article.findByIdAndUpdate({_id: articleId},params,{new:true},(err,articleUpdata)=>{
            if(err){
                return res.status(500).send({
                    status:'Error',
                    message:'Fallo la actualizacion'
                })
            }//fin si hay  error

            if(!articleUpdata){
                return res.status(500).send({
                    status:'Error',
                    message:'No encontrado'
                })
            }//fin si no hay  el articulo updateado

            return res.status(200).send({
                status:'success',
                articleUpdata
            })
        })

    }//fin del if
    else{
        return res.status(404).send({
            status:'Error 404',
            message:'Verifica el Id'
        })
    }

        
    },//fin del update
    delete:(req,res)=>{
        var articleId=req.params.id;

        Article.findByIdAndDelete({_id:articleId},(err,articleDeleted)=>{
            if(err){
                return res.status(500).send({
                    status:'Error',
                    message:'Fallo el delete'
                })
            }
            if(!articleDeleted){
                return res.status(400).send({
                    status:'Error',
                    message:'No encontre el articulo a borrar'
                })
            }
            
            return res.status(200).send({
                status:'Success',
                articleDeleted,
                message:'Este articulo fue eliminado de la base de datos'

            })
        })
    },//fin del delete

    upload:(req,res)=>{
        // var file=req.files;
        var namefile=req.files.file0.originalFilename;
        var file_path=req.files.file0.path;
        var path_split=file_path.split('\\')[2];
        var path_ext=path_split.split('.')[1];
        if(path_ext != 'png' && path_ext != 'jpg')
        {
            fs.unlink(file_path,(err)=>{
                return res.status(400).send({
                    status:'error',
                    message:'la imagen debe ser .png o jpg'
                    
                })
            })
        }
        else
        {
            var articleId=req.params.id;
            if(articleId){
                Article.findOneAndUpdate({_id:articleId},{image:path_split},{new:true},(err,updateado)=>{
    
                    return res.status(200).send({
                        status:'Success',
                        updateado,
                         message:'subido con exito'
                     })
    
                })    
            }else{
                return res.status(200).send({
                    status:'Success',
                    image:path_split
                 })
            }

        }

    },//fin del upload
    getImage:(req,res)=>{
        var image=req.params.image;
        var path_image='./upload/article/'+image;
        fs.exists(path_image,(exists)=>{
            if(exists)
            {
                return res.sendFile(path.resolve(path_image))
                }//fin de si existe
                else{
                    return res.status(404).send({
                        status:'Error',
                        path_image,
                         message:'no Existe la imagen '+image
                     })
            }
        })
    },//fin del getImage
    search:(req,res)=>{
        var searchString=req.params.search;
        Article.find({"$or":[
            {"title":{"$regex":searchString,"$options":"i"}},
            {"content":{"$regex":searchString,"$options":"i"}}
        ]})
        .sort([['date','descending']])
        .exec((err,articles)=>{
            if(err){
                return res.status(500).send({
                    status:'Error 500',
                    message:'Error interno'
                 })
            }
            if(!articles || articles.length<=0){
                return res.status(404).send({
                    status:'Error 404',
                    message:'Error no hay articulos para mostrar'
                 })
            }else{
                return res.status(200).send({status:'Success',articles})
            }
        })
    }//fin del search

};//fin del controller
module.exports =controller;