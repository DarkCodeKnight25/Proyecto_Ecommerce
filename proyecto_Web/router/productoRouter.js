const express = require('express');
const router = express.Router();
const productoController = require("../controller/productoController");

/* parametros controller para control de imagenes */
const multer = require("multer");
const path = require("path");
// const fs = require("fs");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../images"),
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-monkeywit-' + file.originalname);
    },
    });

    const upload = multer({ storage: storage }).single("name_file");
    
/* ****************************************************************/
router.post("/productos/post",upload,(req, res) => {
    console.log(req.file)
});

router.post("/productos",productoController.crearProducto);
router.put("/productos/:id",productoController.actualizarProducto);
router.delete("/productos/:id",productoController.eliminarProducto);
router.get("/productos",productoController.listarProductos);
router.get("/productos/activos",productoController.listarProductosActivos);
router.get("/productos/desactivos",productoController.listarProductosDesactivos);
router.get("/productos/:id",productoController.obtenerProducto);

module.exports=router;
