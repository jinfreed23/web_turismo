const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('login/login', {
        alert: req.flash('alert'),
        alertTitle: req.flash('alertTitle'),
        alertMessage: req.flash('alertMessage'),
        alertIcon: req.flash('alertIcon'),
        showConfirmButton: req.flash('showConfirmButton'),
        timer: req.flash('timer'),
        ruta: req.flash('ruta')
    });
});

router.post('/login', authController.authenticate); 

router.get('/logout', authController.logout); 

module.exports = router;
