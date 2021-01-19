const express = require('express');
const fichUtils = require(__dirname + '/fichero_utils.js');

let app = express();
let productos = fichUtils.cargarProductos();

productos = [
    { id: 1, nombre: 'Queso Afuega\'l Pitu(Rojo)', precio: '2,99€', descripcion: 'Queso sencillo de sabor suave perfecto para tomar como entrante o aperitivo acompañado de una mermelada de Higo o de arándanos. Elaborado artesanalmente con leche pasteurizada de vaca' },
    { id: 2, nombre: 'Queso Afuega\'l Pitu(VERDE)', precio: '6,99€', descripcion: 'Queso complicado de explicar' },
    { id: 3, nombre: 'Queso de cabra', precio: '1,99€', descripcion: '100% cabra asturiana' },
    { id: 4, nombre: 'Queso de vaca', precio: '4,99€', descripcion: '50% vaca asturiana' }
];


fichUtils.guardarProductos(productos);


app.use(express.json());

/* Servicio GET para obtener todos los productos */
app.get('/productos', (req, res) => {
    if (productos && productos.length > 0) {
        res.status(200).send({ ok: true, productos: productos });
    } else {
        res.status(500).send({ ok: false, error: 'No se encontraron productos' });
    }
});

/* Servicio para obtener un producto a partir de su id */
app.get('/productos/:id', (req, res) => {
    let resultado = productos.filter(producto => producto.id == req.params['id']);

    if (resultado.length > 0) {
        res.status(200).send({ ok: true, resultado: resultado[0] });
    } else {
        res.status(400).send({ ok: false, error: 'Producto no encontrado' });
    }
});

// POST para añadir nuevos productos
app.post('/productos', (req, res) => {
    let nuevoProducto = {
        id: req.body.id,
        nombre: req.body.titulo,
        precio: req.body.precio,
        descripcion: req.body.descripcion
    }

    let existe = productos.filter(producto => producto.id == nuevoProducto.id);

    if (existe.length == 0) {
        productos.push(nuevoProducto);
        fichUtils.guardarProductos(productos),
            res.status(200).send({ ok: true });
    } else {
        res.status(400).send({ ok: false, error: 'Código repetido' });
    }
});

// PUT para editar un producto a partir de su id
app.put('/productos/:id', (req, res) => {
    let existe = productos.filter(prod => prod.id == req.params['id']);

    if (existe.length > 0) {
        let producto = existe[0];
        producto.titulo = req.body.titulo;
        producto.precio = req.body.precio;
        producto.descripcion = req.body.descripcion;

        fichUtils.guardarProductos(producto);
        res.status(200).send({ ok: true });
    } else {
        res.status(400).send({ ok: false, error: 'Producto no encontrado' });
    }
});

// DELETE para borrar un producto a partir de su id
app.delete('/productos/:id', (req, res) => {
    let filtrado = productos.filter(prod => prod.id != req.params['id']);
    if(filtrado.length != productos.length){
        productos = filtrado;
        fichUtils.guardarProductos(productos);
        res.status(200).send({ok:true});
    } else {
        res.status(400).send({ok: false, error: 'Producto no encontrado'});
    }
});


app.listen(8080);