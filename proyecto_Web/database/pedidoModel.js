const dataType = require('sequelize');
const conexion = require("./conexion");


//Definimos el objeto relacional a la tabla en la BD
const pedidos=conexion.define('pedido', {
    //Definimos los atributos

    idpedido: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fechaentrega: {
        type: dataType.STRING,
        allowNull: false
    },
    cliente: {
        type: dataType.STRING,
        allowNull: false
    },
    direccion: {
        type: dataType.STRING,
        allowNull: false
    },
    descripcion: {
        type: dataType.STRING,
        allowNull: false
    },
    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    }

    
    
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'pedido',
});

// Sincronizar la tabla con la base de datos [para que borre la data que se esta almacenando { force: true }]
pedidos.sync();

const pedidoModel = { 

    crearPedido: async(fechaentrega,cliente,direccion,descripcion,estado) => {
        let resultado = null;
        try {
           
            resultado = await pedidos.create({fechaentrega,cliente,direccion,descripcion, estado });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en crearPedido Model:', exception);
            resultado = null;
            
        }
        return resultado;
    },
    
    actualizarPedido: async(idpedido,fechaentrega,cliente,direccion,descripcion,estado) => {
        let resultado = null;
        try {
            resultado = await pedidos.findByPk(idpedido);
            if(resultado!=null){
                
                resultado = await resultado.update({ fechaentrega,cliente,direccion,descripcion,estado });
            }       
            console.log(resultado);
        } catch (exception) {
            console.error('Error en actualizarPedido Model:', exception);
            resultado = null;
        }
        return resultado;
    },


    eliminarPedido: async(idpedido) => {
        let resultado = null;
        try {
            resultado = await pedidos.findByPk(idpedido);
            if(resultado!=null){
                resultado = await resultado.update({ estado: false });
            }   
            console.log(resultado);    
        } catch (exception) {
            console.error('Error en eliminarPedido Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    // Ejemplo de listado usando el objeto ORM
    listarPedido: async() => {
        try {
            const resultados = pedidos.findAll();
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarPedido Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarPedidosActivos: async() => {
        try {
            const consulta = "SELECT * FROM pedido WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: true }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarPedidoActivos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarPedidosDesactivos: async() => {
        try {
            const consulta = "SELECT * FROM pedido WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: false }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarPedidoDesactivos Model:', exception);
            return null;
        }
    },
    // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
    obtenerPedido: async(idpedido) => {
        let resultado;
        try {
            [resultado] = await pedidos.findAll({
                attributes: ['idpedido', 'fechaentrega', 'cliente','direccion','descripcion','estado'], // Selecciona los campos que deseas obtener
                where: {
                    idpedido: idpedido, // Filtra por el estado deseado
                },
            });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en obtenerPedido Model:', exception);
            resultado = null;
        }
        return resultado;
    }

}

module.exports = pedidoModel;