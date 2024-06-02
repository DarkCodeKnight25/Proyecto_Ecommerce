const express = require('express');
const router = express.Router();
const proveedoresController = require("../controller/proveedoresController");

router.post("/proveedores",proveedoresController.crearProveedores);
router.put("/proveedores/:idproveedores",proveedoresController.actualizarProveedores);
router.delete("/proveedores/:idproveedores",proveedoresController.eliminarProveedores);
router.get("/proveedores",proveedoresController.listarProveedores);
router.get("/proveedores/activos",proveedoresController.listarProveedoresActivos);
router.get("/proveedores/desactivos",proveedoresController.listarProveedoresDesactivos);
router.get("/proveedores/:idproveedores",proveedoresController.obtenerProveedores);

module.exports=router;
