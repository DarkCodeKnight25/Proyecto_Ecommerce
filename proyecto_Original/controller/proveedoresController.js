const proveedoresservice = require("../service/proveedoresservice");

const crearProveedores = async(req, res)=>{
    try{
        const {nombre,direccion,razon,estado} = req.body;
        const proveedores =  await proveedoresservice.crearProveedores(nombre,direccion,razon,estado);
        res.status(200).json(proveedores);
    }catch(exception){
        res.status(500).json({error:"Error al crear el proveedores"});
    }
}

const actualizarProveedores = async(req, res)=>{
    try{
        const {nombre,direccion,razon,estado} = req.body;
        const {idproveedores} = req.params;
        const proveedores =  await proveedoresservice.actualizarProveedores(idproveedores,nombre,direccion,razon,estado);
        res.status(200).json(proveedores);
    }catch(exception){
        res.status(500).json({error:"Error al actualizar el proveedores"});
    }
}

const eliminarProveedores = async(req, res)=>{
    try{
        const {idproveedores} = req.params;
        const proveedores =  await proveedoresservice.eliminarProveedores(idproveedores);
        res.status(200).json(proveedores);
    }catch(exception){
        res.status(500).json({error:"Error al eliminar el proveedores"});
    }
}

const listarProveedores = async(req, res)=>{
    try {
        const proveedores = await proveedoresservice.listarProveedores();
        res.status(200).json(proveedores);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los proveedores' });
      }
}

const listarProveedoresActivos = async(req, res)=>{
    try {
        const proveedores = await proveedoresservice.listarProveedoresActivos();
        res.status(200).json(proveedores);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los proveedores' });
      }
}

const listarProveedoresDesactivos = async(req, res)=>{
    try {
        const proveedores = await proveedoresservice.listarProveedoresDesactivos();
        res.status(200).json(proveedores);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los proveedores' });
      }
}

const obtenerProveedores = async(req, res)=>{
    try {
        const {idproveedores} = req.params;
        const proveedores = await proveedoresservice.obtenerProveedores(idproveedores);
        res.status(200).json(proveedores);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los proveedores' });
      }
}

module.exports={
    crearProveedores,
    actualizarProveedores,
    eliminarProveedores,
    listarProveedores,
    listarProveedoresActivos,
    listarProveedoresDesactivos,
    obtenerProveedores
}