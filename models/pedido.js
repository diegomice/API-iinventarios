const mongoose = require('mongoose'); // Importa mongoose para interactuar con MongoDB
const Schema = mongoose.Schema; // Alias para Schema

// Define el esquema para los pedidos
const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId, // Referencia a la colección 'User'
        ref: 'User', // El nombre del modelo referenciado
        required: true // Campo obligatorio
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId, // Referencia a la colección 'Producto'
            ref: 'Producto', // El nombre del modelo referenciado
            required: true // Campo obligatorio
        },
        cantidad: {
            type: Number, // Tipo de dato número
            required: true // Campo obligatorio
        }
    }],
    total: {
        type: Number, // Tipo de dato número
        required: true // Campo obligatorio
    },
    estado: {
        type: String, // Tipo de dato cadena
        enum: ['PENDIENTE', 'PAGADO', 'ENVIADO'], // Valores permitidos
        default: 'PENDIENTE' // Valor por defecto
    },
    // Datos para el envío del producto
    paymentCode: {
        type: Number, // Tipo de dato número
        required: true // Campo obligatorio
    },
    nombreEnvio: {
        type: String, // Tipo de dato cadena
        required: true // Campo obligatorio
    },
    telefonoEnvio: {
        type: String, // Tipo de dato cadena
        required: true // Campo obligatorio
    },
    direccionEnvio: {
        type: String, // Tipo de dato cadena
        required: true // Campo obligatorio
    },
    barrioEnvio: {
        type: String, // Tipo de dato cadena
        required: true // Campo obligatorio
    },
    municipioEnvio: {
        type: String, // Tipo de dato cadena
        required: true // Campo obligatorio
    },
    departamentoEnvio: {
        type: String, // Tipo de dato cadena
        required: true // Campo obligatorio
    }
}, {
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Pedido', pedidosSchema); // Exporta el modelo 'Pedido' basado en pedidosSchema
