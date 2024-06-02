const categoriaService = require("../service/categoriaService");

const crearCategoria = async(req, res)=>{
    try{
        const {nombre,estado} = req.body;
        const categorias =  await categoriaService.crearCategoria(nombre, estado);
        res.status(200).json(categorias);
    }catch(exception){
        res.status(500).json({error:"Error al crear la categoria"});
    }
}

const actualizarCategoria = async(req, res)=>{
    try{
        const {nombre,estado} = req.body;
        const {codcategoria} = req.params;
        const categorias =  await categoriaService.actualizarCategoria(codcategoria, nombre,estado);
        res.status(200).json(categorias);
    }catch(exception){
        res.status(500).json({error:"Error al actualizar la categoria"});
    }
}

const eliminarCategoria = async(req, res)=>{
    try{
        const {codcategoria} = req.params;
        const categorias =  await categoriaService.eliminarCategoria(codcategoria);
        res.status(200).json(categorias);
    }catch(exception){
        res.status(500).json({error:"Error al eliminar la categoria"});
    }
}

const listarCategoria = async(req, res)=>{
    try {
        const categorias = await categoriaService.listarCategoria();
        res.status(200).json(categorias);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las categorias' });
      }
}

const listarCategoriaActivos = async(req, res)=>{
    try {
        const categorias = await categoriaService.listarCategoriaActivos();
        res.status(200).json(categorias);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las categorias' });
      }
}

const listarCategoriaDesactivos = async(req, res)=>{
    try {
        const categorias = await categoriaService.listarCategoriaDesactivos();
        res.status(200).json(categorias);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las categorias' });
      }
}

const obtenerCategoria = async(req, res)=>{
    try {
        const {codcategoria} = req.params;
        const categorias = await categoriaService.obtenerCategoria(codcategoria);
        res.status(200).json(categorias);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las categorias' });
      }
}

module.exports={
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    listarCategoria,
    listarCategoriaActivos,
    listarCategoriaDesactivos,
    obtenerCategoria
}