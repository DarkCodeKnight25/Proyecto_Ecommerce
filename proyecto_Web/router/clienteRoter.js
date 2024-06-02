const express = require('express');
const router = express.Router();
const clienteController = require("../controller/clienteController");

router.post("/clientes",clienteController.crearCliente);
router.put("/clientes/:id",clienteController.actualizarCliente);
router.delete("/clientes/:id",clienteController.eliminarCliente);
router.get("/clientes",clienteController.listarClientes);
router.get("/clientes/activos",clienteController.listarClientesActivos);
router.get("/clientes/desactivos",clienteController.listarClientesDesactivos);
router.get("/clientes/:id",clienteController.obtenerCliente);

module.exports=router;

