const dataType = require('sequelize');
const conexion = require("./conexion");


//Definimos el objeto relacional a la tabla en la BD
const categoria=conexion.define('categoria', {
    //Definimos los atributos

    codcategoria: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: dataType.STRING,
        allowNull: false
    },
    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    },

    
    
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'categoria',
});

// Sincronizar la tabla con la base de datos [para que borre la data que se esta almacenando { force: true }]
categoria.sync();

const categoriaModel = { 

    crearCategoria: async(nombre,estado) => {
        let resultado = null;
        try {
            resultado = await categoria.create({ nombre,estado });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en crearCategoria Model:', exception);
            resultado = null;
            
        }
        return resultado;
    },
    
    actualizarCategoria: async(codcategoria, nombre, estado) => {
        let resultado = null;
        try {
            resultado = await categoria.findByPk(codcategoria);
            if(resultado!=null){
                resultado = await resultado.update({ nombre, estado });
            }       
            console.log(resultado);
        } catch (exception) {
            console.error('Error en actualizarCategoria Model:', exception);
            resultado = null;
        }
        return resultado;
    },


    eliminarCategoria: async(codcategoria) => {
        let resultado = null;
        try {
            resultado = await categoria.findByPk(codcategoria);
            if(resultado!=null){
                resultado = await resultado.update({ estado: false });
            }   
            console.log(resultado);    
        } catch (exception) {
            console.error('Error en eliminarCategoria Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    // Ejemplo de listado usando el objeto ORM
    listarCategoria: async() => {
        try {
            const resultados = categoria.findAll();
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarCategoria Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarCategoriaActivos: async() => {
        try {
            const consulta = "SELECT * FROM categoria WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: true }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarCategoriaActivos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarCategoriaDesactivos: async() => {
        try {
            const consulta = "SELECT * FROM categoria WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: false }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarCategoriaDesactivos Model:', exception);
            return null;
        }
    },
    // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
    obtenerCategoria: async(codcategoria) => {
        let resultado;
        try {
            [resultado] = await categoria.findAll({
                attributes: ['codcategoria', 'nombre','estado'], // Selecciona los campos que deseas obtener
                where: {
                    codcategoria: codcategoria, // Filtra por el estado deseado
                },
            });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en obtenerCategoria Model:', exception);
            resultado = null;
        }
        return resultado;
    }

}

module.exports = categoriaModel;