const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

let Schema= mongoose.Schema;

//Podemos definir columnas enumeradas

const enumRoles={
    values:['USER_ROLE','ADMIN_ROLE','GEST_ROLE'],
    message:'{VALUE} no es un rol válido'
};

//Creamos la condiciones del esquema del usuario
let usuarioScherma=new Schema({
    nombre:{
        type:String,        
        required:[true,'El nombre es requerido']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'El email es necesario']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String,
        required:[false]
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum: enumRoles
    },
    estado:{
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:false
    }
});

//Podemos añadir plugins como el validador
usuarioScherma.plugin(uniqueValidator,{
    message:'El {PATH} ya existe'
});

//Modificamos los metodos
//En este caso es para que no te devuelva el password
usuarioScherma.methods.toJSON=function() {
    let user=this;
    let userObject=user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports=mongoose.model('usuario',usuarioScherma);