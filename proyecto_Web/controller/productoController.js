const productoServise = require("../service/productoservice");
const fs = require('fs');
const encode = require('node-base64-image').encode;
const decode = require('node-base64-image').decode;

const crearProducto = async(req, res)=>{
    try{    
        const {nombre, idproveedor, marca, modelo, color, costo, precio, stock, estado, descripcion, name_file} = req.body;
        // Extraer la cabecera del data url
        const base64Data = name_file.replace(/^data:image\/jpeg;base64,/, '');
        const options = {
            String: true,
            headers: {
                "User-Agent": "my-app",
            },
        };
        // Generar un nombre único para el archivo
        const imagen = `imagen_${Date.now()}.jpg`;
        //const imagen = await encode(`imagen_${Date.now()}.jpg`, options); ;
        // Guardar la imagen en disco
        fs.writeFile(`uploads/${imagen}`, base64Data, 'base64', (err) => {        
            if (err) {
            console.error('Error al guardar la imagen:', err);
            return res.status(500).json({ error: 'Error al guardar la imagen' });
            }
            console.log('Imagen guardada con éxito:', imagen);
        });
        const producto =  await productoServise.crearProducto(nombre, idproveedor, marca, modelo, color, costo, precio, stock, estado, descripcion, imagen);
        res.status(200).json(producto);
    }catch(excpetion){
        res.status(500).json({error:"Error al crear el producto"});
    }
}

const actualizarProducto = async(req, res)=>{
    try{
        const {nombre, idproveedor, marca, modelo, color, costo, precio, stock, estado, descripcion} = req.body;
        const {id} = req.params;
        const producto =  await productoServise.actualizarProducto(id, nombre, idproveedor, marca, modelo, color, costo, precio, stock, estado, descripcion);
        res.status(200).json(producto);
    }catch(excpetion){
        res.status(500).json({error:"Error al actualizar el producto"});
    }
}

const eliminarProducto = async(req, res)=>{
    try{
        const {id} = req.params;
        const producto =  await productoServise.eliminarProducto(id);
        res.status(200).json(producto);
    }catch(excpetion){
        res.status(500).json({error:"Error al eliminar el producto"});
    }
}

const listarProductos = async(req, res)=>{
    try {
        const productos = await productoServise.listarProductos();
        res.status(200).json(productos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

const listarProductosActivos = async(req, res)=>{
    try {
        const productos = await productoServise.listarProductosActivos();
        res.status(200).json(productos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

const listarProductosDesactivos = async(req, res)=>{
    try {
        const productos = await productoServise.listarProductosDesactivos();
        res.status(200).json(productos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

const obtenerProducto = async(req, res)=>{
    try {
        const {id} = req.params;
        const productos = await productoServise.obtenerProducto(id);
        res.status(200).json(productos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

module.exports={
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    listarProductos,
    listarProductosActivos,
    listarProductosDesactivos,
    obtenerProducto
}
