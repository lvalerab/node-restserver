const express = require('express');
const app=express();
const bcrypt=require('bcrypt');
const _=require('underscore');
const saltRounds=10;

const Usuario=require('../modelos/usuarios'); //Importamos el esquema de usuarios

const  {verificaToken, HasAdminRole, HasUserRole, HasGestRole}=require('../middleware/autentificacion');

app.get('/usuario/:id',
verificaToken
, (req,res) => {
    let id=req.params.id;

    Usuario.findById(id,(err,usuarioBD)=> {
        if(err) {
            res.status(400).json({
                ok:false,
                mensaje:err
            });
        } else {
            res.status(200).json(
                {
                    ok:true,
                    usuario:usuarioBD
                }
            );
        }
    });
});


app.get('/usuario',
verificaToken
, (req,res) => {
    let id=req.usuario._id;
    Usuario.findById(id,(err,usuarioBD)=> {
        if(err) {
            res.status(400).json({
                ok:false,
                mensaje:err
            });
        } else {
            res.status(200).json(
                {
                    ok:true,
                    usuario:usuarioBD
                }
            );
        }
    });
});

app.get('/lista',
verificaToken
,(req,res)=> {
    let desde=req.query.desde || 0;
    let cantidad=req.query.cantidad ||0;
    let filtro={
        estado:true
    };

    desde=Number(desde);
    cantidad=Number(cantidad);    
    Usuario.find(filtro,['nombre','email','img','estado'])
        .skip(desde*cantidad)
        .limit(cantidad)
        .exec((err,usuarios)=> {
            if(err) {
                res.status(400).json({
                    ok:false,
                    mensaje:err
                });
            } else {
                Usuario.count(filtro,(err,cuantos)=> {
                    if(err) {
                        res.status(400).json({
                            ok:false,
                            mensaje:err
                        });
                    } else {
                        res.status(200).json({
                            ok:true,
                            paginations:{
                                desde:desde*cantidad,
                                cantidad,
                                hasta:((desde+1)*cantidad)-1>cuantos-1?cuantos-1:((desde+1)*cantidad)-1,
                                total:cuantos
                            },
                            usuarios
                        });
                    }
                });
            }
        });
});

app.post('/usuario',[verificaToken,HasAdminRole],async function (req,res) {
    let body=req.body; 
    let usuario=new Usuario({
        nombre:body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        role:body.role
    });
    
    //Guardamos
    await usuario.save((err,usuarioDB)=> {
        if(err) {
            //usuarioDB.password=null;
            res.status(400).json({
                ok:false,
                mensaje:err
            });
        } else {
            res.status(200).json({
                ok:true,
                usuario:usuarioDB
            });
        }
    });
});

app.put('/usuario/:id',[verificaToken,HasAdminRole],(req,res)=> {
    let id=req.params.id;
    //let body=req.body;

    //SOlucion 1 para no actualizar campos
    //delete body.password;
    //delete body.email;
    //delete body.google;
    //Con underscore
    let body=_.pick(req.body,['nombre','img','role','estado']); //Solo actualiza estos campos

    Usuario.findByIdAndUpdate(id,body,{
        new:true,
        runValidators:true //para que compruebe todas las validaciones
    }, (err, usuarioDB)=> {
        if(err) {
            res.status(400).json({
                ok:false,
                mensaje:err
            });
        } else {
            res.status(200).json({
                ok:true,
                usuario:usuarioDB
            });
        }
    });
});

//Eliminacion fisica
/*app.delete('/usuario/:id',(req,res)=> {
    let id=req.params.id;

    Usuario.findByIdAndRemove(id,{},(err,usuarioBD)=> {
        if(err) {
            res.status(400).json({
                ok:false,
                mensaje:err
            });
        } else {
            if(usuarioBD) {
                res.status(200).json({
                    ok:true,
                    usuarioBD:usuarioBD
                });
            } else {
                res.status(404).json({
                    ok:false,
                    mensaje:"El usuario no existe"
                });
            }
        };
    });
});*/


app.delete('/usuario/:id',[verificaToken,HasAdminRole],(req,res)=> {
    let id=req.params.id;

    Usuario.findByIdAndUpdate(id,{
        estado:false
    },
    {
        new:true,
        runValidators:true //para que compruebe todas las validaciones
    },(err,usuarioBD)=>{
        if(err) {
            res.status(400).json({
                ok:false,
                mensaje:err
            });
        } else {
            res.status(200).json({
                ok:true,
                usuarioBD:usuarioBD
            });
        }
    });
});

module.exports=app;