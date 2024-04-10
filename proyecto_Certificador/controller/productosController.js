const productoModel = require('../models/productos');

function mostrarProductos(req, res) {
    const nombre_producto = req.query.nombre_producto;
    

    productoModel.obtenerProductos((err,productos) => {
        if (err) {
            console.error('Error al obtener los productos: ', err);
            res.status(500).send('Error al obtener los productos');
            return;
        }
        res.render('productos', {productos});
    });
}

module.exports = {
    mostrarProductos
};
