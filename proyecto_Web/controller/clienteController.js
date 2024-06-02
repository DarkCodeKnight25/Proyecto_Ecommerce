const clienteServise = require("../service/clienteservice");

const crearCliente = async(req, res)=>{
    try{
        const {nombre,  telefono, email, direccion, estado} = req.body;
        const cliente =  await clienteServise.crearCliente(nombre,  telefono, email, direccion, estado);
        res.status(200).json(cliente);
    }catch(excpetion){
        res.status(500).json({error:"Error al crear el cliente"});
    }
}

const actualizarCliente = async(req, res)=>{
    try{
        const {nombre, telefono, email, direccion, estado} = req.body;
        const {id} = req.params;
        const cliente =  await clienteServise.actualizarCliente(id, nombre, telefono, email, direccion, estado);
        res.status(200).json(cliente);
    }catch(excpetion){
        res.status(500).json({error:"Error al actualizar el cliente"});
    }
}

const eliminarCliente = async(req, res)=>{
    try{
        const {id} = req.params;
        const cliente =  await clienteServise.eliminarCliente(id);
        res.status(200).json(cliente);
    }catch(excpetion){
        res.status(500).json({error:"Error al eliminar el cliente"});
    }
}

const listarClientes = async(req, res)=>{
    try {
        const cliente = await clienteServise.listarClientes();
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los cliente' });
      }
}

const listarClientesActivos = async(req, res)=>{
    try {
        const cliente = await clienteServise.listarClientesActivos();
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los cliente' });
      }
}

const listarClientesDesactivos = async(req, res)=>{
    try {
        const cliente = await clienteServise.listarClientesDesactivos();
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los cliente' });
      }
}

const obtenerCliente = async(req, res)=>{
    try {
        const {id} = req.params;
        const cliente = await clienteServise.obtenerCliente(id);
        res.status(200).json(cliente);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los cliente' });
      }
}

module.exports={
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    listarClientes,
    listarClientesActivos,
    listarClientesDesactivos,
    obtenerCliente
}