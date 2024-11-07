const express = require('express');
const router = express.Router();
const paqueteturisticoController = require('../controllers/paqueteturisticoController');

router.get('/paqueteturistico', paqueteturisticoController.getAllPackages);
router.post('/paqueteturistico/update', paqueteturisticoController.updatePackage);
router.post('/paqueteturistico/add', paqueteturisticoController.addPackage);
router.delete('/paqueteturistico/delete/:id', paqueteturisticoController.deletePackage);

module.exports = router;