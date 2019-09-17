require('./config/config');
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const timer =(time,func) => setTimeout(func,time);


const app=express();

//Configuramos los middleware
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(require('./rutas/usuario'));


app.listen(process.env.PORT,() => {
    console.log(`Escuchando en el puerto 3000`);
});

timer(10000,function() {
  let urlMongo='mongodb://mongodb:27017/cafe';
  console.log(`Intentando conectar a mongodb: ${urlMongo}`);
  mongoose.connect(urlMongo,
  //mongoose.connect('mongodb+srv://node_rest_admin:Qqxt4E0aoVAISjwF@cluster-lfvb-node-rest-z5jlt.mongodb.net/cafe',
    {
      useNewUrlParser: true,
      //useUnifiedTopology: true
    }, (err,res)=> {
      if(err) {
        console.log(`Error al conectar a la base de datos ${urlMongo}, causa:`);
        console.log(err);
      } else {
        console.log('Base de datos online');
      }
  });
});



module.exports= {
    app
}