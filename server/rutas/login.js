const express = require('express');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');

//Para el sign in de google
const {OAuth2Client}=require('google-auth-library');
const clgoogle=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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



//Sigin de google

async function verify(token ) {
    const ticket = await clgoogle.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);
    return {
        nombre:payload.name,
        email:payload.email,
        img:payload.picture,
        google:true
    }
  }

app.post('/google',async (req,res)=> {
    let user=await verify(req.body.idtoken)
                .catch((err)=> {
                    res.status(403).json({
                        ok:false,
                        err
                    })
                });
    
    //Vemos en la base de datos
    Usuario.findOne({email:user.email},(err, userbd)=>{
        if(err) {
            return res.status(500).json({
                ok:false,
                err
            });
        } else {
            if(userbd) {
                if(userbd.google===false) {
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message:"Debe de usar su autentificacion original"
                        }
                    });
                } else {
                    res.status(200).json( {
                        ok:true,
                        usuario:userbd,
                        token:jwt.sign({
                            userbd
                        },process.env.TOKEN_SEED, {
                            expiresIn:process.env.TOKEN_CADUCIDAD
                        })
                    });
                }
            } else {
                //Si el usuario no existe en la base de datos
                let usuario=new Usuario();
                usuario.nombre=user.nombre;
                usuario.email=user.email;
                usuario.img=user.img;
                usuario.google=true;
                usuario.password=':P';
                usuario.save((err,newUser)=> {
                    if(err) {
                        return res.status(500).json({
                            ok:false,
                            err
                        });
                    } else {
                        res.status(200).json( {
                            ok:true,
                            usuario:newUser,
                            token:jwt.sign({
                                newUser
                            },process.env.TOKEN_SEED, {
                                expiresIn:process.env.TOKEN_CADUCIDAD
                            })
                        });
                    }
                })
            }
        }
    });

});

module.exports=app;