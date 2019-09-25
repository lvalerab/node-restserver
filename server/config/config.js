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

//Para el uso del sigin de google
process.env.GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID||'108204328503-3auc9kputlcr8pa6usvkem4db1g24s96.apps.googleusercontent.com';