const proveedoresModel = require("../database/proveedoresModel");

const crearProveedores = async(nombre,direccion,razon,estado) => {
    let proveedores = null;
    try {
        proveedores = await proveedoresModel.crearProveedores(nombre,direccion,razon,estado);
    } catch (exception) {
        console.error('Error en crearProveedores Service:', exception);
        proveedores = null;
    }
    return proveedores;
}

const actualizarProveedores = async(idproveedores,nombre,direccion,razon,estado) => {
    let proveedores = null;
    try {
        proveedores = await proveedoresModel.actualizarProveedores(idproveedores,nombre,direccion,razon,estado);   
    } catch (exception) {
        console.error('Error en actualizarUsuario Service:', exception);
        proveedores = null;
    }
    return proveedores;
}

const eliminarProveedores = async(idproveedores) => {
    let proveedores = null;
    try {
        proveedores = await proveedoresModel.eliminarProveedores(idproveedores);       
    } catch (exception) {
        console.error('Error en eliminarProveedores Service:', exception);
        proveedores = null;
    }
    return proveedores;
}


const listarProveedores = async() => {
    let listarProveedores;
    try {
        listarProveedores = await proveedoresModel.listarProveedores();
    } catch (exception) {
        console.error('Error en listarproveedores Service:', exception);
        listarProveedores = null;
    }
    return listarProveedores;
}

const listarProveedoresActivos = async() => {
    let listarProveedores;
    try {
        listarProveedores = await proveedoresModel.listarProveedoresActivos();
    } catch (exception) {
        console.error('Error en listarProveedoresActivos Service:', exception);
        listarProveedores = null;
    }
    return listarProveedores;
}

const listarProveedoresDesactivos = async() => {
    let listarProveedores;
    try {
        listarProveedores = await proveedoresModel.listarProveedoresDesactivos();
    } catch (exception) {
        console.error('Error en listarProveedoresActivos Service:', exception);
        listarProveedores = null;
    }
    return listarProveedores;
}

const obtenerProveedores = async(idproveedores) => {
    let proveedores = [];
    try {
        proveedores = await proveedoresModel.obtenerProveedores(idproveedores);
    } catch (exception) {
        console.error('Error en obtenerProveedores Service:', exception);
        proveedores = null;
    }
    return proveedores;
}


module.exports = {
    crearProveedores,
    actualizarProveedores,
    eliminarProveedores,
    listarProveedores,
    listarProveedoresActivos,
    listarProveedoresDesactivos,
    obtenerProveedores
}