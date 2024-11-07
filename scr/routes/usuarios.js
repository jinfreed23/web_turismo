const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.getAllUsuarios);
router.post('/usuarios/update', usuarioController.updateUsuario);
router.post('/usuarios/add', usuarioController.addUsuario);
router.delete('/usuarios/delete/:id', usuarioController.deleteUsuario);

module.exports = router;
