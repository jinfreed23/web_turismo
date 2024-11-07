const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) =>{
    res.render('links/dashboard');
});

router.get('/list_clientes', (req, res) =>{
    res.render('links/clientes');
});

router.get('/list_usuarios', (req, res) =>{
    res.render('links/usuarios');
});

router.get('/list_proveedores', (req, res) =>{
    res.render('links/proveedores');
});

router.get('/list_servicios', (req, res) =>{
    res.render('links/servicios');
});

router.get('/list_pagos', (req, res) =>{
    res.render('links/pagos');
});

router.get('/list_paqueteturistico', (req, res) =>{
    res.render('links/paqueteturistico');
});

router.get('/list_reserva', (req, res) =>{
    res.render('links/reserva');
});


module.exports = router;

