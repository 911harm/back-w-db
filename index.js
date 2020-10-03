'use strict'
var mongoose= require('mongoose');
var url= process.env.DB_URL || 'mongodb://localhost:27017/test1';
var app= require('./app');
var port =process.env.PORT || '9300';
const host=process.env.HOST|| '0.0.0.0';


mongoose.Promise=global.Promise;//evita fallos, con las promesas

mongoose.set('useFindAndModify',false);//los nuevos metodos y evita los viejos

mongoose.connect(url,{useNewUrlParser:true}).then(()=>{
    console.log("Conectado el Servidor");
    //crear servidor y escucha
    app.listen(port,host,()=>{
        console.log("Servidor corriendo en "+host+port)
        
    })
});
