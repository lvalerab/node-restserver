/// =============================
/// Verficiacion token
/// =============================

const jwt=require('jsonwebtoken');

let verificaToken = (req, res, next)=> {
    let token=req.header('token');
    console.log(`token: ${token}`);
    jwt.verify(token,process.env.TOKEN_SEED, (err,decoded)=> {
        if(err) {
            return res.status(401).json({
                ok:false,
                err:'Token no válido'
            });
        } else {
            //Se lo pasamos al req para las demas peticiones
            req.usuario=decoded.usuario;
            next();
        }
    });   
};

let HasAdminRole=(req,res,next)=> {
    if(req.usuario.role==='ADMIN_ROLE') {
        next();
    } else  {
        return res.status(401).json({
            ok:false,
            err:'Necesita ser administrador'
        });
    }
}

let HasUserRole=(req,res,next)=> {
    if(req.usuario.role==='USER_ROLE') {
        next();
    } else  {
        return res.status(401).json({
            ok:false,
            err:'Necesita ser usuario de la aplicacion'
        });
    }
}

let HasGestRole=(req,res,next)=> {
    if(req.usuario.role==='GEST_ROLE') {
        next();
    } else  {
        return res.status(401).json({
            ok:false,
            err:'Necesita ser gestor'
        });
    }
}

module.exports={
    verificaToken,
    HasAdminRole,
    HasUserRole,
    HasGestRole
};