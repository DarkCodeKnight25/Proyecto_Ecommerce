const dataType = require('sequelize');
const conexion = require("./conexion");


//Definimos el objeto relacional a la tabla en la BD
const usuarios=conexion.define('usuario', {
    //Definimos los atributos

    idusuario: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuario: {
        type: dataType.STRING,
        allowNull: false
    },
    password: {
        type: dataType.BLOB('tiny'),
        allowNull: false
    },
    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    },
    

    
    
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'usuario',
    
});

// Sincronizar la tabla con la base de datos [para que borre la data que se esta almacenando { force: true }]
usuarios.sync();

const usuarioModel = { 

    crearUsuario: async(usuario,password,estado) => {
        let resultado = null;
        try {
            const encryptedPassword = conexion.literal(`AES_ENCRYPT('${password}', 'IDAT')`);
            resultado = await usuarios.create({ usuario,password:encryptedPassword,estado });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en crearUsuario Model:', exception);
            resultado = null;
            
        }
        return resultado;
    },
    
    actualizarUsuario: async(idusuario, usuario, password, estado) => {
        let resultado = null;
        try {
            resultado = await usuarios.findByPk(idusuario);
            if(resultado!=null){
                const encryptedPassword = conexion.literal(`AES_ENCRYPT('${password}', 'IDAT')`);
                resultado = await resultado.update({ usuario, password:encryptedPassword, estado });
            }       
            console.log(resultado);
        } catch (exception) {
            console.error('Error en actualizarUsuario Model:', exception);
            resultado = null;
        }
        return resultado;
    },


    eliminarUsuario: async(idusuario) => {
        let resultado = null;
        try {
            resultado = await usuarios.findByPk(idusuario);
            if(resultado!=null){
                resultado = await resultado.update({ estado: false });
            }   
            console.log(resultado);    
        } catch (exception) {
            console.error('Error en eliminarUsuario Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    // Ejemplo de listado usando el objeto ORM
    listarUsuario: async() => {
        try {
            const resultados = usuarios.findAll();
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarUsuario Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarUsuariosActivos: async() => {
        try {
            const consulta = "SELECT * FROM usuario WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: true }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarUsuariosActivos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarUsuariosDesactivos: async() => {
        try {
            const consulta = "SELECT * FROM usuario WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: false }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            console.log(resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarUsuariosDesactivos Model:', exception);
            return null;
        }
    },
    // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
    obtenerUsuario: async(idusuario) => {
        let resultado;
        try {
            [resultado] = await usuarios.findAll({
                attributes: ['idusuario', 'usuario', 'password','estado'], // Selecciona los campos que deseas obtener
                where: {
                    idusuario: idusuario, // Filtra por el estado deseado
                },
            });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en obtenerUsuario Model:', exception);
            resultado = null;
        }
        return resultado;
    }

}

module.exports = usuarioModel;