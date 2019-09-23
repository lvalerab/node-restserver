///=========================================
/// MongoDB
///=========================================

process.env.MONGODB_CAD_CONEX=process.env.MONGODB_CAD_CONEX||'mongodb+srv://node_rest_admin:Qqxt4E0aoVAISjwF@cluster-lfvb-node-rest-z5jlt.mongodb.net/cafe';

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