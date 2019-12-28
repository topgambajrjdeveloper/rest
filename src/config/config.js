// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// DB Local Y Remota
// ======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/api_fastfine';
} else {
    urlDB = 'mongodb+srv://fastfine:lcANOr91yuLvtIMF@cluster0-pg99x.mongodb.net/api_fastfine?retryWrites=true&w=majority';
}
process.env.URLDB = urlDB;


dbuser: 'fastfine';
dbpassword: 'lcANOr91yuLvtIMF';

dbadmin: 'topgambajrjdeveloper';
dbpassword: 'lcANOr91yuLvtIMF';

// ======================
// JWT
// ======================
process.env.SEED ||
  'yY=eD~jLh~c[ir{u}wlKf;~s3JkK=04I@jc@cEBWJDfkyCT+SgaNboJHX[:';
miIP: '37.134.221.69';
