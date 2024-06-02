const clienteModel = require("../database/clienteModel");

const crearCliente = async(nombre,  telefono, email, direccion, estado) => {
    let cliente = null;
    try {
        cliente = await clienteModel.crearCliente(nombre,  telefono, email,direccion, estado );
    } catch (exception) {
        console.error('Error en crearCliente Service:', exception);
        cliente = null;
    }
    return cliente;
}

const actualizarCliente = async(id, nombre, telefono, email, direccion, estado) => {
    let cliente = null;
    try {
        cliente = await clienteModel.actualizarCliente(id, nombre, telefono, email, direccion, estado);   
    } catch (exception) {
        console.error('Error en actualizarCliente Service:', exception);
        cliente = null;
    }
    return cliente;
}

const eliminarCliente = async(id) => {
    let cliente = null;
    try {
        cliente = await clienteModel.eliminarCliente(id);       
    } catch (exception) {
        console.error('Error en eliminarCliente Service:', exception);
        cliente = null;
    }
    return cliente;
}

const listarClientes = async() => {
    let listaClientes;
    try {
        listaClientes = await clienteModel.listarClientes();
    } catch (exception) {
        console.error('Error en listarClientes Service:', exception);
        listaClientes = null;
    }
    return listaClientes;
}

const listarClientesActivos = async() => {
    let listaClientes;
    try {
        listaClientes = await clienteModel.listarClientesActivos();
    } catch (exception) {
        console.error('Error en listarClientesActivos Service:', exception);
        listaClientes = null;
    }
    return listaClientes;
}

const listarClientesDesactivos = async() => {
    let listaClientes;
    try {
        listaClientes = await clienteModel.listarClientesDesactivos();
    } catch (exception) {
        console.error('Error en listarClientesDesactivos Service:', exception);
        listaClientes = null;
    }
    return listaClientes;
}

const obtenerCliente = async(id) => {
    let cliente;
    try {
        cliente = await clienteModel.obtenerCliente(id);
    } catch (exception) {
        console.error('Error en obtenerCliente Service:', exception);
        cliente = null;
    }
    return cliente;
}

module.exports = {
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    listarClientes,
    listarClientesActivos,
    listarClientesDesactivos,
    obtenerCliente
}


