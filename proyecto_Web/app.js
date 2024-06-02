//Dependencias del Proyecto Altared
const express = require('express');
const app = express();
const session = require("express-session");

const productoRoter= require('./router/productoRouter');
const usuarioRoter = require('./router/usuarioRouter');
const userRouter = require('./router/userRouter');
const proveedoresRouter= require('./router/proveedoresRouter');
const ventaRouter= require('./router/ventaRouter');
const pedidoRouter= require('./router/pedidoRouter');
const categoriaRouter = require('./router/categoriaRouter');
const clienteRoter= require('./router/clienteRoter');

//Aqui estan las credenciales de conexcion
require("dotenv").config({ path: "./properties.env" });


//+++INICIO CONFIGURACION DEL BACKEND+++//
// Configuración para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
// Configuración para analizar el cuerpo de las solicitudes URL codificado
app.use(express.urlencoded({ extended: true }));
//Reter por cada API
app.use("/api",productoRoter);
app.use("/api", usuarioRoter);
app.use("/api", userRouter);
app.use("/api",proveedoresRouter);
app.use("/api",ventaRouter);
app.use("/api",pedidoRouter);
app.use("/api",categoriaRouter);
app.use("/api",clienteRoter);
//+++FIN CONFIGURACION DEL BACKEND+++//

//+++INICIO CONFIGURACION DEL FRONTEND+++//
//Motor de plantilla de las vistas Web
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Definir las carpetas del front que sera accedidas de manera publica
app.use(express.static(__dirname + "/public"))


//Configurar una varible de entorno para la clave secreta de la sesion
const sessionSecret = process.env.SESSION_SECRET;
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

//Sessiones de errores de logeo
app.post('/userlogin', (req, res) => {
    try {
        const usuario = req.body.usuario;
        req.session.user = { usuario: usuario };
        res.status(200).json({ resultado: 1 });
    } catch (excpetion) {
        res.status(500).json({ resultado: 0, error: "Error al crear la sesion" });
    }
});

app.post('/userLogout', (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
            }
        });
        res.status(200).json({ resultado: 1 });
    } catch (excpetion) {
        res.status(500).json({ resultado: 0, error: "Error al cerrar la sesion" });
    }
});

//MidWare
app.get('/', (req, res) => {
    res.render("index")
})



//MidWare
app.get('/about', (req, res) => {
    res.render("about")
})

//MidWare
app.get('/product', (req, res) => {
    res.render("product")
})

//MidWare
app.get('/contact', (req, res) => {
    res.render("contact")
})

//MidWare
app.get('/gallery', (req, res) => {
    res.render("gallery")
})


//MidWare
app.get('/home', (req, res) => {
    res.render("home")
})

//MidWare
app.get('/producto', (req, res) => {
    res.render("producto")
})

//MidWare
app.get('/contactos', (req, res) => {
    res.render("contactos")
})

//MidWare
app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/registro', (req, res) => {
    res.render("crear_usuario")
})

//MidWare
app.get('/rusuario', (req, res) => {
    res.render("registro_usuario")
})

//MidWare
app.get('/rproducto', (req, res) => {
    res.render("registro_producto")
})

//MidWare
app.get('/rproveedor', (req, res) => {
    res.render("registro_proveedores")
})

//MidWare
app.get('/rcliente', (req, res) => {
    res.render("registro_clientes")
})

//MidWare
app.get('/rventa', (req, res) => {
    res.render("registro_ventas")
})

//MidWare
app.get('/rpedido', (req, res) => {
    res.render("registro_pedido")
})

//MidWare
app.get('/rcategoria', (req, res) => {
    res.render("registro_categoria")
})


//MidWare 404
app.use((req, res, next) => {
    res.status(404).render("404")
})


//+++FIN CONFIGURACION DEL BACKEND+++//


//Ejecucion del HOST y el PUERTO de salida
const port = process.env.PORT;
const host = process.env.HOST
app.listen(port, host, () => {
    console.log(`Servidor en ejecución en http://${host}:${port}`);
});