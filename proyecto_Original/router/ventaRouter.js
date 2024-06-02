const express = require('express');
const router = express.Router();
const ventaController = require("../controller/ventaController");




router.post("/venta",ventaController.crearVenta);
router.put("/venta/:idventa",ventaController.actualizarVenta);
router.delete("/venta/:idventa",ventaController.eliminarVenta);
router.get("/venta",ventaController.listarVenta);
router.get("/venta/activos",ventaController.listarVentaActivos);
router.get("/venta/desactivos",ventaController.listarVentaDesactivos);
router.get("/venta/:idventa",ventaController.obtenerVenta);

module.exports=router;



