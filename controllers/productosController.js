const Producto = require('../models/Producto'); // Importa el modelo Producto
const multer = require('multer'); // Importa multer para manejo de archivos
const shortid = require('shortid'); // Importa shortid para generar IDs únicos
const path = require('path'); // Importa path para manejar rutas de archivos

// Configuración de multer para manejar la subida de archivos
const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadsDir = path.join(__dirname, '../uploads'); // Define la carpeta de destino para los archivos
            cb(null, uploadsDir); // Llama al callback con la ruta de destino
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]; // Obtiene la extensión del archivo
            cb(null, `${shortid.generate()}.${extension}`); // Genera un nombre único para el archivo
        }
    }),
    fileFilter(req, file, cb) {
        // Filtra los tipos de archivos permitidos
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true); // Acepta archivos JPEG y PNG
        } else {
            cb(new Error('Formato No válido')); // Rechaza otros formatos
        }
    }
};

const upload = multer(configuracionMulter).single('imagen'); // Crea una instancia de multer con la configuración

// Middleware para subir archivos
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message }); // Maneja errores de subida
        }
        return next(); // Continúa con la siguiente función del middleware
    });
};

// Controlador para agregar un nuevo producto
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body); // Crea una nueva instancia del modelo Producto con los datos del request

    try {
        if (req.file) {
            producto.imagen = req.file.filename; // Si hay un archivo, añade su nombre al producto
        }
        await producto.save(); // Guarda el producto en la base de datos
        res.json({ mensaje: 'Se agregó un nuevo producto' }); // Responde con un mensaje de éxito
    } catch (error) {
        console.log(error); // Muestra el error en la consola
        next(); // Pasa el control al siguiente middleware
    }
};

// Controlador para mostrar todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find({}); // Busca todos los productos en la base de datos
        res.json(productos); // Responde con la lista de productos
    } catch (error) {
        console.log(error); // Muestra el error en la consola
        next(); // Pasa el control al siguiente middleware
    }
};

// Controlador para mostrar un producto específico por su ID
exports.mostrarProducto = async (req, res, next) => {
    try {
        const producto = await Producto.findById(req.params.idProducto); // Busca el producto por ID

        if (!producto) {
            res.json({ mensaje: 'Ese Producto no existe' }); // Si no encuentra el producto, responde con un mensaje
            return next(); // Pasa el control al siguiente middleware
        }

        res.json(producto); // Responde con el producto encontrado
    } catch (error) {
        console.log('Error al buscar el producto:', error); // Muestra el error en la consola
        next(); // Pasa el control al siguiente middleware
    }
};

// Controlador para actualizar un producto específico por su ID
exports.actualizarProducto = async (req, res, next) => {
    try {
        let nuevoProducto = req.body; // Obtiene los datos del request

        if (req.file) {
            nuevoProducto.imagen = req.file.filename; // Si hay un archivo, añade su nombre al producto
        } else {
            let productoAnterior = await Producto.findById(req.params.idProducto); // Busca el producto anterior por ID
            nuevoProducto.imagen = productoAnterior.imagen; // Mantiene la imagen anterior si no hay nueva imagen
        }

        let producto = await Producto.findOneAndUpdate({ _id: req.params.idProducto }, nuevoProducto, {
            new: true // Devuelve el producto actualizado
        });

        res.json(producto); // Responde con el producto actualizado
    } catch (error) {
        console.log(error); // Muestra el error en la consola
        next(); // Pasa el control al siguiente middleware
    }
};

// Controlador para eliminar un producto específico por su ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Producto.findByIdAndDelete({ _id: req.params.idProducto }); // Elimina el producto por ID
        res.json({ mensaje: 'El Producto se ha eliminado' }); // Responde con un mensaje de éxito
    } catch (error) {
        console.log(error); // Muestra el error en la consola
        next(); // Pasa el control al siguiente middleware
    }
};

// Controlador para buscar productos basados en una consulta
exports.buscarProducto = async (req, res, next) => {
    try {
        const { query } = req.params; // Obtiene la consulta de los parámetros
        const producto = await Producto.find({ nombre: new RegExp(query, 'i') }); // Busca productos cuyo nombre coincida con la consulta
        res.json(producto); // Responde con los productos encontrados
    } catch (error) {
        console.log(error); // Muestra el error en la consola
        next(); // Pasa el control al siguiente middleware
    }
};
