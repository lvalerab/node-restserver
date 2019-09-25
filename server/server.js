require('./config/config');
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const timer =(time,func) => setTimeout(func,time);
const path=require('path'); //PAra rutas relativas

const app=express();

//Configuramos los middleware
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

//Establecemos el contenido statico
app.use(express.static(path.resolve(__dirname,`../public`)));

//Habitilaciond e rutas
app.use(require('./rutas/index.js'));

app.listen(process.env.PORT,() => {
    console.log(`Escuchando en el puerto 3000`);
});

timer(10000,function() {
  let urlMongo=process.env.MONGODB_CAD_CONEX;
  console.log(`Intentando conectar a mongodb: ${urlMongo}`);
  mongoose.connect(urlMongo,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true //Para quitar el deprecated al conectar al mongo en heroku
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