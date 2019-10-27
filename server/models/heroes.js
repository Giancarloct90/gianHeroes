const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let heroesEschema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    bio: {
        type: String,
        required: [true, 'La Biografia es Necesaria']
    },
    img: {
        type: String,
        required: false
    },
    aparicion: {
        type: String,
        required: false
    },
    casa: {
        type: String,
        required: false
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model('Heroes', heroesEschema);