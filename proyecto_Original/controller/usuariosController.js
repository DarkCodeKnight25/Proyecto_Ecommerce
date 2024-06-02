const usuariosService = require("../service/usuarioservice");

const crearUsuario = async(req, res)=>{
    try{
        const {usuario,password,estado} = req.body;
        const usuarios =  await usuariosService.crearUsuario(usuario, password, estado);
        res.status(200).json(usuarios);
    }catch(exception){
        res.status(500).json({error:"Error al crear el usuario"});
    }
}

const actualizarUsuario = async(req, res)=>{
    try{
        const {usuario, password,estado} = req.body;
        const {idusuario} = req.params;
        const usuarios =  await usuariosService.actualizarUsuario(idusuario, usuario, password,estado);
        res.status(200).json(usuarios);
    }catch(exception){
        res.status(500).json({error:"Error al actualizar el usuario"});
    }
}

const eliminarUsuario = async(req, res)=>{
    try{
        const {idusuario} = req.params;
        const usuarios =  await usuariosService.eliminarUsuario(idusuario);
        res.status(200).json(usuarios);
    }catch(exception){
        res.status(500).json({error:"Error al eliminar el usuario"});
    }
}

const listarUsuario = async(req, res)=>{
    try {
        const usuarios = await usuariosService.listarUsuario();
        res.status(200).json(usuarios);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
}

const listarUsuariosActivos = async(req, res)=>{
    try {
        const usuarios = await usuariosService.listarUsuariosActivos();
        res.status(200).json(usuarios);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
}

const listarUsuariosDesactivos = async(req, res)=>{
    try {
        const usuarios = await usuariosService.listarUsuariosDesactivos();
        res.status(200).json(usuarios);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
}

const obtenerUsuario = async(req, res)=>{
    try {
        const {idusuario} = req.params;
        const usuarios = await usuariosService.obtenerUsuario(idusuario);
        res.status(200).json(usuarios);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
}

module.exports={
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuario,
    listarUsuariosActivos,
    listarUsuariosDesactivos,
    obtenerUsuario
}