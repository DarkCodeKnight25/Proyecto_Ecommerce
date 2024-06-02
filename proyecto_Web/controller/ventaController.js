const ventaService = require("../service/ventaService");

const crearVenta = async(req, res)=>{
    try{    
       
        const {usuario, codigo, producto, precioproducto,preciototal,estado} = req.body;
        const venta =  await ventaService.crearVenta(usuario, codigo, producto, precioproducto,preciototal,estado);
        res.status(200).json(venta);
    }catch(excpetion){
        res.status(500).json({error:"Error al crear la venta"});
    }
}

const actualizarVenta= async(req, res)=>{
    try{
        const {usuario, codigo, producto, precioproducto,preciototal,estado} = req.body;
        const {idventa} = req.params;
        const venta =  await ventaService.actualizarVenta(idventa,usuario, codigo, producto, precioproducto,preciototal,estado);
        res.status(200).json(venta);
    }catch(excpetion){
        res.status(500).json({error:"Error al actualizar la venta"});
    }
}

const eliminarVenta= async(req, res)=>{
    try{
        const {idventa} = req.params;
        const venta =  await ventaService.eliminarVenta(idventa);
        res.status(200).json(venta);
    }catch(excpetion){
        res.status(500).json({error:"Error al eliminar venta"});
    }
}

const listarVenta = async(req, res)=>{
    try {
        const venta = await ventaService.listarVenta();
        res.status(200).json(venta);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las ventas' });
      }
}

const listarVentaActivos = async(req, res)=>{
    try {
        const venta = await ventaService.listarVentaActivos();
        res.status(200).json(venta);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las ventas' });
      }
}

const listarVentaDesactivos = async(req, res)=>{
    try {
        const venta = await ventaService.listarVentaDesactivos();
        res.status(200).json(venta);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las ventas' });
      }
}

const obtenerVenta = async(req, res)=>{
    try {
        const {idventa} = req.params;
        const ventas = await ventaService.obtenerVenta(idventa);
        res.status(200).json(ventas);
      } catch (error) {
        console.error(error); // Muestra el error en la consola para obtener más detalles
        res.status(500).json({ error: 'Error al obtener las ventas' });
      }
}

module.exports={
    crearVenta,
    actualizarVenta,
    eliminarVenta,
    listarVenta,
    listarVentaActivos,
    listarVentaDesactivos,
    obtenerVenta
    

}