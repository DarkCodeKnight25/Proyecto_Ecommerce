const express = require('express');
const router = express.Router();
const usuariosController = require("../controller/usuariosController");

router.post("/usuario",usuariosController.crearUsuario);
router.put("/usuario/:idusuario",usuariosController.actualizarUsuario);
router.delete("/usuario/:idusuario",usuariosController.eliminarUsuario);
router.get("/usuario",usuariosController.listarUsuario);
router.get("/usuario/activos",usuariosController.listarUsuariosActivos);
router.get("/usuario/desactivos",usuariosController.listarUsuariosDesactivos);
router.get("/usuario/:idusuario",usuariosController.obtenerUsuario);

module.exports=router;
