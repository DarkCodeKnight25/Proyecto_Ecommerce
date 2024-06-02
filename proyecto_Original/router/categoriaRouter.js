const express = require('express');
const router = express.Router();
const categoriaController = require("../controller/categoriaController");

router.post("/categoria",categoriaController.crearCategoria);
router.put("/categoria/:codcategoria",categoriaController.actualizarCategoria);
router.delete("/categoria/:codcategoria",categoriaController.eliminarCategoria);
router.get("/categoria",categoriaController.listarCategoria);
router.get("/categoria/activos",categoriaController.listarCategoriaActivos);
router.get("/categoria/desactivos",categoriaController.listarCategoriaDesactivos);
router.get("/categoria/:codcategoria",categoriaController.obtenerCategoria);

module.exports=router;
