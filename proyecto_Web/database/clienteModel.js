const dataType = require('sequelize');
const conexion = require("./conexion");

//Definimos el objeto relacional a la tabla en la BD
const cliente=conexion.define('cliente', {
    //Definimos los atributos
    id: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: dataType.STRING,
        allowNull: false
    },
    telefono: {
        type: dataType.STRING,
        allowNull: false,
    },
    email: {
        type: dataType.STRING,
        allowNull: false,
    },
    direccion: {
        type: dataType.STRING,
        allowNull: false,
    },

    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    }
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'cliente',
});

// Sincronizar la tabla con la base de datos [para que borre la data que se esta almacenando { force: true }]
cliente.sync();

const clienteModel = {    
     crearCliente: async(nombre,  telefono, email, direccion, estado) => {
        let resultado = null;
        try {
            resultado = await cliente.create({ nombre, telefono, email, direccion, estado });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en crearCliente Model:', exception);
            resultado = null;
            
        }
        return resultado;
    },
    
    actualizarCliente: async(id, nombre, telefono, email, direccion, estado) => {
        let resultado = null;
        try {
            resultado = await cliente.findByPk(id);
            if(resultado!=null){
                resultado = await resultado.update({ nombre, telefono, email, direccion, estado });
            }       
            console.log(resultado);
        } catch (exception) {
            console.error('Error en actualizarCliente Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    eliminarCliente: async(id) => {
        let resultado = null;
        try {
            resultado = await cliente.findByPk(id);
            if(resultado!=null){
                resultado = await resultado.update({ estado: false });
            }   
            console.log(resultado);    
        } catch (exception) {
            console.error('Error en eliminarCliente Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    // Ejemplo de listado usando el objeto ORM
    listarClientes: async() => {
        try {
            const resultados = cliente.findAll();
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarClientes Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarClientesActivos: async() => {
        try {
            const consulta = "SELECT * FROM cliente WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: true }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarClientesActivos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarClientesDesactivos: async() => {
        try {
            const consulta = "SELECT * FROM cliente WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: false }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarClientesDesactivos Model:', exception);
            return null;
        }
    },
    // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
    obtenerCliente: async(id) => {
        let resultado;
        try {
            [resultado] = await  cliente.findAll({
                attributes: ['nombre', 'telefono', 'email','direccion','estado'], // Selecciona los campos que deseas obtener
                where: {
                    id: id, // Filtra por el estado deseado
                },
            });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en obtenerCliente Model:', exception);
            resultado = null;
        }
        return resultado;
    }

}

module.exports = clienteModel;

