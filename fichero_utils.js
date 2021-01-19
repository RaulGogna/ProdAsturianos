const fs = require('fs');

let cargarProductos = () =>{
    let productos = [];
    if(fs.existsSync('productos.json'))
        libros = JSON.parse(fs.readFileSync('productos.json'), 'utf8');
    
    return productos;
}

let guardarProductos = (productos) =>{
    fs.writeFileSync('productos.json', JSON.stringify(productos));
}

module.exports = {
    cargarProductos: cargarProductos,
    guardarProductos: guardarProductos
}