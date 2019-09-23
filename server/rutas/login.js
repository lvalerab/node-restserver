const express = require('express');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');

const Usuario=require('../modelos/usuarios'); 


const app=express();

app.post('/login',(req,res)=> {

    let body=req.body;

    Usuario.findOne({
        email:body.email
    }, (err, usuario)=> {
        if(err) {
            return res.status(301).json({
                ok:false,
                err
            })
        } else {
            if(!usuario) {
                return res.status(401).json({
                    ok:false,
                    err:{
                        message:'El usuario o contraseña incorrectos'
                    }
                });
            } else {
                if(!bcrypt.compareSync(body.password,usuario.password)) {
                    return res.status(401).json({
                        ok:false,
                        err:{
                            message:'El usuario o contraseña incorrectos'
                        }
                    });
                } else {
                    res.status(200).json( {
                        ok:true,
                        token:jwt.sign({
                            usuario
                        },process.env.TOKEN_SEED, {
                            expiresIn:process.env.TOKEN_CADUCIDAD
                        })
                    });
                } 
            }  
        }
    })
});



module.exports=app;