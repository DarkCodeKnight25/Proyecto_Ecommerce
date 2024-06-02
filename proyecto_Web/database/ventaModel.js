const dataType = require('sequelize');
const conexion = require("./conexion");


//Definimos el objeto relacional a la tabla en la BD
const venta=conexion.define('venta', {
    //Definimos los atributos

    idventa: {
        type: dataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuario: {
        type: dataType.STRING,
        allowNull: false
    },
    codigo: {
        type: dataType.STRING,
        allowNull: false
    },
    producto: {
        type: dataType.STRING,
        allowNull: false,
    },
    precioproducto: {
        type: dataType.DECIMAL,
        allowNull: false,
    },
    preciototal: {
        type: dataType.DECIMAL,
        allowNull: false,
    },
    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    },
    
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'venta',
});
venta.sync();



const ventaModel = {    
    crearVenta: async(usuario, codigo, producto, precioproducto,preciototal,estado ) => {
       let resultado = null;
       try {
           //consulta = "INSERT INTO producto VALUES (NULL, "usuario, codigo, producto, precioproducto,preciototal", "+name_file+")";
           resultado = await venta.create({ usuario, codigo, producto, precioproducto,preciototal,estado });
           console.log(resultado);
       } catch (exception) {
           console.error('Error al crear la venta', exception);
           resultado = null;
           
       }
       return resultado;
   },
   
   actualizarVenta: async(idventa,usuario, codigo, producto, precioproducto,preciototal,estado) => {
       let resultado = null;
       try {
           resultado = await venta.findByPk(idventa);
           if(resultado!=null){
               resultado = await resultado.update({ usuario, codigo, producto, precioproducto,preciototal,estado });
           }       
           console.log(resultado);
       } catch (exception) {
           console.error('Error al actualizar la venta Model:', exception);
           resultado = null;
       }
       return resultado;
   },

   eliminarVenta: async(idventa) => {
       let resultado = null;
       try {
           resultado = await venta.findByPk(idventa);
           if(resultado!=null){
               resultado = await resultado.update({ estado: false });
           }   
           console.log(resultado);    
       } catch (exception) {
           console.error('Error al eliminar venta:', exception);
           resultado = null;
       }
       return resultado;
   },

   // Ejemplo de listado usando el objeto ORM
   listarVenta: async() => {
       try {
           const resultados = venta.findAll();
           console.log(resultados);
           return resultados;
       } catch (exception) {
           console.error('Error al listar la venta', exception);
           return null;
       }
   },
   // Ejemplo de listado usando una consulta SQL personalizada
   listarVentaActivos: async() => {
       try {
           const consulta = "SELECT * FROM venta WHERE estado = :estado";
           const resultados = await conexion.query(consulta, {
               replacements: { estado: true }, // Reemplazo de parámetros
               type: dataType.QueryTypes.SELECT,
           });
           console.log(resultados);
           return resultados;
       } catch (exception) {
           console.error('Error en listarventaACTIVOS:', exception);
           return null;
       }
   },
   // Ejemplo de listado usando una consulta SQL personalizada
   listarVentaDesactivos: async() => {
       try {
           const consulta = "SELECT * FROM venta WHERE estado = :estado";
           const resultados = await conexion.query(consulta, {
               replacements: { estado: false }, // Reemplazo de parámetros
               type: dataType.QueryTypes.SELECT,
           });
           console.log(resultados);
           return resultados;
       } catch (exception) {
           console.error('Error en listarventadesactivados:', exception);
           return null;
       }
   },
   // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
   obtenerVenta: async(idventa) => {
       let resultado;
       try {
        resultado = await venta.findByPk(idventa, {
            attributes: ['idventa','usuario','codigo','producto','precioproducto','preciototal','estado'], // Selecciona los campos que deseas obtener
               where: {
                   idventa: idventa, // Filtra por el estado deseado
               },
           });
           console.log(resultado);
       } catch (exception) {
           console.error('Error en obetener la venta:', exception);
           resultado = null;
       }
       return resultado;
   }

}

module.exports = ventaModel;