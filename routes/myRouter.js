// Importar el controlador y Express
const myController = require('../controllers/myController');
const express = require('express');
const router = express.Router();

// Definir las rutas y acciones de respuesta
router.route('/').get(myController.Principal);
router.route('/glsEsp').get(myController.glsEsp);
router.route('/glsIng').get(myController.glsIng);

// Exportar el enrutador para su uso en otros archivos
module.exports = router;
