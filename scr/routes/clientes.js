const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.getAllClientes);
router.post('/clientes/update', clienteController.updateCliente);
router.post('/clientes/add', clienteController.addCliente);
router.delete('/clientes/delete/:id', clienteController.deleteCliente);

module.exports = router;
