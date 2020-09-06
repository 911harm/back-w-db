'use strict'
//
 var express= require('express');
 var bodyParser= require('body-parser');
//Ejecutar Express(http)
 var app= express();

//Cargar ficheros rutas (ideal 1 solo)
var article_r= require('./routes/article');


 //middelWares /Se Ejecutan antes

 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());

 //CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



 //Añadir prefijos a rutas/ Cargar rutas
 app.use('/api',article_r);





//Ruta de prueba y metodo de prueba

/*app.get('/probando',(req,res)=>{
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

})*/


 //exportando
 module.exports= app;