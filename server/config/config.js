///=========================================
/// MongoDB
///=========================================

process.env.MONGODB_CAD_CONEX=process.env.MONGODB_CAD_CONEX||'mongodb://mongodb:27017/cafe';

///=========================================
/// Puerto
///=========================================

process.env.PORT=process.env.PORT || 3000;

///=========================================
/// Token
///=========================================
///Caducidad
process.env.TOKEN_CADUCIDAD=process.env.TOKEN_CADUCIDAD||60*60*24*30;
///Caducidad
process.env.TOKEN_SEED= process.env.TOKEN_SEED || 'TOKEN-DESARROLLO';