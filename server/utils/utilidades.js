const fs = require('fs');
const path = require('path');

let borrarImagen = (imagen, accion) => {
    let pathImagen = path.join(__dirname, `../../public/uploads/${imagen}`);

    if (fs.existsSync(pathImagen)) {
        console.log(pathImagen);
        fs.unlinkSync(pathImagen);
    } else {
        console.log(pathImagen);
        console.log(`Se intento ${accion} y se produjo un error`);
    }
}

module.exports = {
    borrarImagen
};