const dataType = require('sequelize');
const conexion = require("./conexion");


//Definimos el objeto relacional a la tabla en la BD
const proveedores=conexion.define('proveedores', {
    //Definimos los atributos

    idproveedores: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: dataType.STRING,
        allowNull: false
    },
    direccion: {
        type: dataType.STRING,
        allowNul: false
    },
    razon: {
        type: dataType.STRING,
        allowNull: false
    },
    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    },

    
    
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'proveedores',
});

// Sincronizar la tabla con la base de datos [para que borre la data que se esta almacenando { force: true }]
proveedores.sync();

const proveedoresModel = { 

    crearProveedores: async(nombre,direccion,razon,estado) => {
        let resultado =  null;
        try {
            resultado = await proveedores.create({ nombre,direccion,razon,estado });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en crearproveedores Model:', exception);
            resultado = null;
            
        }
        return resultado;
    },
    
    actualizarProveedores: async(idproveedores,nombre,direccion,razon,estado) => {
        let resultado = null;
        try {
            resultado = await proveedores.findByPk(idproveedores);
            if(resultado!=null){
                resultado = await resultado.update({ nombre,direccion,razon, estado });
            }       
            console.log(resultado);
        } catch (exception) {
            console.error('Error en actualizarProveedores Model:', exception);
            resultado = null;
        }
        return resultado;
    },


    eliminarProveedores: async(idproveedores) => {
        let resultado = null;
        try {
            resultado = await proveedores.findByPk(idproveedores);
            if(resultado!=null){
                resultado = await resultado.update({ estado: false });
            }   
            console.log(resultado);    
        } catch (exception) {
            console.error('Error en eliminarProveedores Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    // Ejemplo de listado usando el objeto ORM
    listarProveedores: async() => {
        try {
            const resultados = proveedores.findAll();
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarProveedores Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarProveedoresActivos: async() => {
        try {
            const consulta = "SELECT * FROM proveedores WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: true }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarProveedoresActivos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarProveedoresDesactivos: async() => {
        try {
            const consulta = "SELECT * FROM proveedores WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: false }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarProveedoresDesactivos Model:', exception);
            return null;
        }
    },
    // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
    obtenerProveedores: async(idproveedores) => {
        let resultado;
        try {
            [resultado] = await proveedores.findAll({
                attributes: ['idproveedores', 'nombre', 'direccion','razon','estado'], // Selecciona los campos que deseas obtener
                where: {
                    idproveedores: idproveedores, // Filtra por el estado deseado
                },
            });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en obtenerProveedor Model:', exception);
            resultado = null;
        }
        return resultado;
    }

}

module.exports = proveedoresModel;