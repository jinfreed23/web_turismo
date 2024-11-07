const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

router.get('/proveedores', proveedorController.getAllProveedores);
router.post('/proveedores/update', proveedorController.updateProveedor);
router.post('/proveedores/add', proveedorController.addProveedor);
router.delete('/proveedores/delete/:id', proveedorController.deleteProveedor);

module.exports = router;
