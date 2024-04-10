const connection = require('../database/conexion');

function obtenerProductos(callback) {
    const query = 'SELECT * FROM products where id_producto>1';
    connection.query(query, (err, productos) => {
        if (err) {
            console.error('Error al obtener los Productos: ', err);
            callback(err, null);
            return;
        } 
         // Imprimir los productos en la consola antes de llamar a la función de devolución de llamada
               
        callback(null, productos);
        console.log('Productos obtenidos:', productos); 
    });
}

module.exports = {
    obtenerProductos
};
