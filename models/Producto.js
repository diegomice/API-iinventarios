const mongoose = require('mongoose'); // Importa mongoose para interactuar con MongoDB

// Define el esquema para el modelo de Producto
const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String, // Define el tipo de dato como String
        required: true // Indica que este campo es obligatorio
    },
    descripcion: {
        type: String, // Define el tipo de dato como String
        required: true // Indica que este campo es obligatorio
    },
    precio: {
        type: Number, // Define el tipo de dato como Number
        required: true // Indica que este campo es obligatorio
    },
    stock: {
        type: Number, // Define el tipo de dato como Number
        required: true // Indica que este campo es obligatorio
    },
    imagen: {
        type: String // Define el tipo de dato como String (no es obligatorio)
    }
}, {
    timestamps: true // Habilita las propiedades createdAt y updatedAt automáticamente
});

// Exporta el modelo de Producto usando el esquema definido
module.exports = mongoose.model('Producto', ProductoSchema);
