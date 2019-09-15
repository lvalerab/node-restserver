require('./config/config');
const express = require('express');
const bodyParser=require('body-parser');

const app=express();

//Configuramos los middleware
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.get('/usuario/:id',(req,res) => {
    

    res.json(`get usuario ${req.params.id}`);
});

app.post('/usuario',(req,res) => {
    let body=req.body;
    if(body.nombre===undefined) {
        res.status(400).json({
            ok:false,
            mensaje:"El nombre es necesario"
        });
    } else {
        res.json({
            body
        });
    }
})

app.put('/usuario',(req,res)=> {
    res.json('put usuario');
})

app.delete('/usuario',(req,res)=> {
    res.json('delete usuario');
})

app.listen(process.env.PORT,() => {
    console.log(`Escuchando en el puerto 3000`);
});


module.exports= {
    app
}