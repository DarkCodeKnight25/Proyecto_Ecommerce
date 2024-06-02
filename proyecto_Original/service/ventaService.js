const ventaModel = require("../database/ventaModel");

const crearVenta = async(usuario, codigo, producto, precioproducto,preciototal,estado ) => {
    let venta = null;
    try {
        venta = await ventaModel.crearVenta(usuario, codigo, producto, precioproducto,preciototal,estado  );
    } catch (exception) {
        console.error('Error en crearVenta', exception);
        venta = null;
    }
    return venta;
}



const actualizarVenta= async(idventa,usuario, codigo, producto, precioproducto,preciototal,estado) => {
    let venta = null;
    try {
        venta = await ventaModel.actualizarVenta(idventa,usuario, codigo, producto, precioproducto,preciototal,estado);   
    } catch (exception) {
        console.error('Error en actualizarVenta Service:', exception);
        venta = null;
    }
    return venta;
}

const eliminarVenta= async(idventa) => {
    let venta = null;
    try {
        venta = await ventaModel.eliminarVenta(idventa);       
    } catch (exception) {
        console.error('Error en eliminarVenta Service:', exception);
        venta = null;
    }
    return venta;
}


const listarVenta = async() => {
    let listarVenta;
    try {
        listarVenta = await ventaModel.listarVenta();
    } catch (exception) {
        console.error('Error en listarVenta Service:', exception);
        listarVenta = null;
    }
    return listarVenta;
}

const listarVentaActivos = async () => {
    let listaVenta;
    try {
        listaVenta = await ventaModel.listarVentaActivos();
    } catch (exception) {
        console.error('Error en listarVentaActivos Service:', exception);
        listaVenta = null;
    }
    return listaVenta;
}



const listarVentaDesactivos = async() => {
    let listaVenta;
    try {
        listaVenta = await ventaModel.listarVentaDesactivos();
    } catch (exception) {
        console.error('Error en listarVentaDesactivos Service:', exception);
        listaVenta = null;
    }
    return listaVenta;
}





const obtenerVenta = async(idventa) => {
    let venta;
    try {
        venta = await ventaModel.obtenerVenta(idventa);
    } catch (exception) {
        console.error('Error en obtenerVenta Service:', exception);
        venta = null;
    }
    return venta;
}






module.exports = {
    crearVenta,
    eliminarVenta,
    listarVenta,
    listarVentaActivos,
    listarVentaDesactivos,
    obtenerVenta,
    actualizarVenta

}