const express = require('express'); // Importa el módulo express
const router = express.Router(); // Crea una nueva instancia del enrutador de express
const pedidosController = require('../controllers/pedidosController'); // Importa el controlador de pedidos

// Ruta para agregar nuevos pedidos
router.post('/pedidos/nuevo', pedidosController.nuevoPedido); 
// Llama al controlador para crear un nuevo pedido cuando se realiza una solicitud POST a '/pedidos/nuevo'

// Ruta para mostrar todos los pedidos
router.get('/pedidos', pedidosController.mostrarPedidos); 
// Llama al controlador para mostrar todos los pedidos cuando se realiza una solicitud GET a '/pedidos'

// Ruta para mostrar un pedido específico por su ID
router.get('/pedidos/:idPedido', pedidosController.mostrarPedido); 
// Llama al controlador para mostrar un pedido específico por su ID cuando se realiza una solicitud GET a '/pedidos/:idPedido'

// Ruta para actualizar un pedido específico por su ID
router.put('/pedidos/:idPedido', pedidosController.actualizarPedido); 
// Llama al controlador para actualizar un pedido específico por su ID cuando se realiza una solicitud PUT a '/pedidos/:idPedido'

// Ruta para eliminar un pedido específico por su ID
router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido); 
// Llama al controlador para eliminar un pedido específico por su ID cuando se realiza una solicitud DELETE a '/pedidos/:idPedido'

module.exports = router; // Exporta el enrutador para que pueda ser usado en otras partes de la aplicación
