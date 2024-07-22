const express = require('express'); // Importa el módulo express
const router = express.Router(); // Crea una nueva instancia del enrutador de express
const productosController = require('../controllers/productosController'); // Importa el controlador de productos

// Ruta para agregar nuevos productos
router.post('/productos', 
    productosController.subirArchivo, // Middleware para subir archivos
    productosController.nuevoProducto // Controlador para crear un nuevo producto
);

// Ruta para mostrar todos los productos
router.get('/productos', 
    productosController.mostrarProductos // Controlador para mostrar todos los productos
);

// Ruta para mostrar un producto específico por su ID
router.get('/productos/:idProducto', 
    productosController.mostrarProducto // Controlador para mostrar un producto por su ID
);

// Ruta para actualizar un producto específico por su ID
router.put('/productos/:idProducto', 
    productosController.subirArchivo, // Middleware para subir archivos
    productosController.actualizarProducto // Controlador para actualizar un producto por su ID
);

// Ruta para eliminar un producto específico por su ID
router.delete('/productos/:idProducto', 
    productosController.eliminarProducto // Controlador para eliminar un producto por su ID
);

// Ruta para buscar productos basados en una consulta
router.post('/productos/busqueda/:query',
    productosController.buscarProducto // Controlador para buscar productos basados en una consulta
);

module.exports = router; // Exporta el enrutador para que pueda ser usado en otras partes de la aplicación
