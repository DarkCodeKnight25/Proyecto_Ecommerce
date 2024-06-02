const pedidoService = require("../service/pedidoservice");

const crearPedido = async(req, res)=>{
    try{
        const {fechaentrega,cliente,direccion,descripcion,estado} = req.body;
        const pedidos =  await pedidoService.crearPedido(fechaentrega,cliente,direccion,descripcion,estado);
        res.status(200).json(pedidos);
    }catch(exception){
        res.status(500).json({error:"Error al crear el pedido"});
    }
}

const actualizarPedido = async(req, res)=>{
    try{
        const {fechaentrega,cliente,direccion,descripcion,estado} = req.body;
        const {idpedido} = req.params;
        const pedidos =  await pedidoService.actualizarPedido(idpedido, fechaentrega,cliente,direccion,descripcion,estado);
        res.status(200).json(pedidos);
    }catch(exception){
        res.status(500).json({error:"Error al actualizar el pedido"});
    }
}

const eliminarPedido = async(req, res)=>{
    try{
        const {idpedido} = req.params;
        const pedidos =  await pedidoService.eliminarPedido(idpedido);
        res.status(200).json(pedidos);
    }catch(exception){
        res.status(500).json({error:"Error al eliminar el pedido"});
    }
}

const listarPedido = async(req, res)=>{
    try {
        const pedidos = await pedidoService.listarPedido();
        res.status(200).json(pedidos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los pedidos' });
      }
}

const listarPedidosActivos = async(req, res)=>{
    try {
        const pedidos = await pedidoService.listarPedidosActivos();
        res.status(200).json(pedidos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los pedidos' });
      }
}

const listarPedidosDesactivos = async(req, res)=>{
    try {
        const pedidos = await pedidoService.listarPedidosDesactivos();
        res.status(200).json(pedidos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los pedidos' });
      }
}

const obtenerPedido = async(req, res)=>{
    try {
        const {idpedido} = req.params;
        const pedidos = await pedidoService.obtenerPedido(idpedido);
        res.status(200).json(pedidos);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener los pedidos' });
      }
}

module.exports={
    crearPedido,
    actualizarPedido,
    eliminarPedido,
    listarPedido,
    listarPedidosActivos,
    listarPedidosDesactivos,
    obtenerPedido
}