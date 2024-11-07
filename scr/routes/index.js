const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('inicio/inicio');
});

router.get('/nosotros', (req, res) =>{
    res.render('mostrar/nosotros');
});

router.get('/contact', (req, res) =>{
    res.render('mostrar/contact');
});

router.get('/serv', (req, res) =>{
    res.render('mostrar/serv');
});

module.exports = router;