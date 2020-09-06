'use strict'
var mongoose= require('mongoose');
var url='mongodb://localhost:27017/test1';
var app= require('./app');
var port =9300;


mongoose.Promise=global.Promise;//evita fallos, con las promesas

mongoose.set('useFindAndModify',false);//los nuevos metodos y evita los viejos

mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log("Conectado el Servidor");
    //crear servidor y escucha
    app.listen(port,()=>{
        console.log("Servidor corriendo en localhots:"+port)
    })
});