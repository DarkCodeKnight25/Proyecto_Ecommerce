const pedidoModel = require("../database/pedidoModel");

const crearPedido = async(fechaentrega,cliente,direccion,descripcion,estado) => {
    let pedidos = null;
    try {
        pedidos = await pedidoModel.crearPedido(fechaentrega,cliente,direccion,descripcion,estado );
    } catch (exception) {
        console.error('Error en crearPedido Service:', exception);
        pedidos = null;
    }
    return pedidos;
}

const actualizarPedido = async(idpedido,fechaentrega,cliente,direccion,descripcion,estado) => {
    let pedidos = null;
    try {
        pedidos = await pedidoModel.actualizarPedido(idpedido,fechaentrega,cliente,direccion,descripcion,estado);   
    } catch (exception) {
        console.error('Error en actualizarPedido Service:', exception);
        pedidos = null;
    }
    return pedidos;
}

const eliminarPedido = async(idpedido) => {
    let pedidos = null;
    try {
        pedidos = await pedidoModel.eliminarPedido(idpedido);       
    } catch (exception) {
        console.error('Error en eliminarPedido Service:', exception);
        pedidos = null;
    }
    return pedidos;
}


const listarPedido = async() => {
    let listaPedido;
    try {
        listaPedido = await pedidoModel.listarPedido();
    } catch (exception) {
        console.error('Error en listarPedido Service:', exception);
        listaPedido = null;
    }
    return listaPedido;
}

const listarPedidosActivos = async() => {
    let listaPedido;
    try {
        listaPedido = await pedidoModel.listarPedidosActivos();
    } catch (exception) {
        console.error('Error en listarPedidosActivos Service:', exception);
        listaPedido = null;
    }
    return listaPedido;
}

const listarPedidosDesactivos = async() => {
    let listaPedido;
    try {
        listaPedido = await pedidoModel.listarPedidosDesactivos();
    } catch (exception) {
        console.error('Error en listarPedidosDesactivos Service:', exception);
        listaPedido = null;
    }
    return listaPedido;
}

const obtenerPedido = async(idpedido) => {
    let pedidos;
    try {
        pedidos = await pedidoModel.obtenerPedido(idpedido);
    } catch (exception) {
        console.error('Error en obtenerPedido Service:', exception);
        pedidos = null;
    }
    return pedidos;
}


module.exports = {
    crearPedido,
    actualizarPedido,
    eliminarPedido,
    listarPedido,
    listarPedidosActivos,
    listarPedidosDesactivos,
    obtenerPedido
}