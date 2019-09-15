require('./config/config');
const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');



const app=express();

//Configuramos los middleware
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(require('./rutas/usuario'));


app.listen(process.env.PORT,() => {
    console.log(`Escuchando en el puerto 3000`);
});


//mongoose.connect('mongodb://localhost:27017/cafe',{
mongoose.connect('mongodb+srv://node_rest_admin:Qqxt4E0aoVAISjwF@cluster-lfvb-node-rest-z5jlt.mongodb.net/cafe',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err,res)=> {
    if(err) throw err;
    console.log('Base de datos online');
});

module.exports= {
    app
}