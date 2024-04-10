const sequelize = require('sequelize');
//Configurar las variables de entorno
require("dotenv").config({path:"./properties.env"});

const conexion = new sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Probar la conexión a la base de datos
conexion
    .authenticate()
    .then(() => {
        console.log('Conexion exitosa a la base de datos.');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });

    
module.exports=conexion;