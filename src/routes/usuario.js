const express = require('express');
const app = express();

// bcryt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const _ = require('underscore');
const Usuario = require('../models/usuario');

app.get('/usuarios', function(req, res) {

    let pagina = req.query.pagina || 0;
    pagina = Number(pagina);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true})
            .skip(pagina)
            .limit(limite)
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({estado: true}, (err, conteo) => {

                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });
            });
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        alias: body.alias,
        email: body.email,
        password: bcrypt.hashSync( body.password, saltRounds),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario:/id', function(req, res) {
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario:/id', function(req, res) {

    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado)

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndRemove(id, cambiaEstado, {new: true}, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});


module.exports = app;