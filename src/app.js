require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

// Configuración
app.set(process.env.PORT);

// Parser application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencnoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Cargar rutas

// Rutas de la api
app.use(require('./routes/usuario'));

// Controlomamos el rendimiento en multiHilo


// Se inicia el servidor Node y MongoDb
mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, useCreateIndex: true}
        , (err, res) => {

    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});


// Exportamos el modulo
module.exports = app;
