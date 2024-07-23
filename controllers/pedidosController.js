const Pedido = require('../models/Pedido'); // Importa el modelo Pedido para interactuar con la base de datos

// Controlador para agregar un nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedido(req.body); // Crea una nueva instancia de Pedido con los datos del cuerpo de la solicitud
    try {
        await pedido.save(); // Guarda el nuevo pedido en la base de datos
        res.json({ mensaje: 'Se agregó un nuevo pedido' }); // Envía una respuesta JSON indicando que el pedido se ha agregado
    } catch (error) {
        console.log(error); // Muestra el error en la consola si ocurre alguno
        next(error); // Pasa el error al siguiente middleware
    }
};

// Controlador para mostrar todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedido.find({})
            .populate('cliente', '-password') // Llena el campo 'cliente' y omite el campo 'password'
            .populate('pedido.producto'); // Llena el campo 'producto' dentro del array 'pedido'
        res.json(pedidos); // Envía una respuesta JSON con todos los pedidos
    } catch (error) {
        console.log(error); // Muestra el error en la consola si ocurre alguno
        next(); // Pasa el error al siguiente middleware
    }
};

// Controlador para mostrar un pedido específico por su ID
exports.mostrarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedido.findById(req.params.idPedido)
            .populate('cliente', '-password') // Llena el campo 'cliente' y omite el campo 'password'
            .populate('pedido.producto'); // Llena el campo 'producto' dentro del array 'pedido'

        if(!pedido) {
            res.json({mensaje : 'Ese pedido no existe'}); // Envía una respuesta JSON indicando que el pedido no existe
            return next(); // Pasa al siguiente middleware
        }
        res.json(pedido); // Envía una respuesta JSON con el pedido encontrado
    } catch (error) {
        console.log(error); // Muestra el error en la consola si ocurre alguno
        next(); // Pasa el error al siguiente middleware
    }
}; 

// Controlador para actualizar un pedido por su ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        const pedido = await Pedido.findOneAndUpdate({_id: req.params.idPedido}, req.body, {new: true})
            .populate('cliente', '-password') // Llena el campo 'cliente' y omite el campo 'password'
            .populate('pedido.producto'); // Llena el campo 'producto' dentro del array 'pedido'

        res.json(pedido); // Envía una respuesta JSON con el pedido actualizado
    } catch (error) {
        console.log(error); // Muestra el error en la consola si ocurre alguno
        next(); // Pasa el error al siguiente middleware
    }
};

// Controlador para eliminar un pedido por su ID
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedido.findByIdAndDelete(req.params.idPedido); // Elimina el pedido por su ID
        res.json({ mensaje : 'El pedido se ha eliminado' }); // Envía una respuesta JSON indicando que el pedido se ha eliminado
    } catch (error) {
        console.log(error); // Muestra el error en la consola si ocurre alguno
        next(); // Pasa el error al siguiente middleware
    }
};
