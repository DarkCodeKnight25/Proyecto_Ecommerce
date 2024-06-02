const express = require('express');
const router = express.Router();
const pedidoController = require("../controller/pedidoController");

router.post("/pedido",pedidoController.crearPedido);
router.put("/pedido/:idpedido",pedidoController.actualizarPedido);
router.delete("/pedido/:idpedido",pedidoController.eliminarPedido);
router.get("/pedido",pedidoController.listarPedido);
router.get("/pedido/activos",pedidoController.listarPedidosActivos);
router.get("/pedido/desactivos",pedidoController.listarPedidosDesactivos);
router.get("/pedido/:idpedido",pedidoController.obtenerPedido);

module.exports=router;
