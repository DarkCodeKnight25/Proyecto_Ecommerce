const usuarioModel = require("../database/usuarioModel");

const crearUsuario = async(usuario,password,estado) => {
    let usuarios = null;
    try {
        usuarios = await usuarioModel.crearUsuario(usuario,password,estado );
    } catch (exception) {
        console.error('Error en crearUsuario Service:', exception);
        usuarios = null;
    }
    return usuarios;
}

const actualizarUsuario = async(idusuario,usuario,password,estado) => {
    let usuarios = null;
    try {
        usuarios = await usuarioModel.actualizarUsuario(idusuario,usuario,password,estado);   
    } catch (exception) {
        console.error('Error en actualizarUsuario Service:', exception);
        usuarios = null;
    }
    return usuarios;
}

const eliminarUsuario = async(idusuario) => {
    let usuarios = null;
    try {
        usuarios = await usuarioModel.eliminarUsuario(idusuario);       
    } catch (exception) {
        console.error('Error en eliminarUsuario Service:', exception);
        usuarios = null;
    }
    return usuarios;
}


const listarUsuario = async() => {
    let listaUsuario;
    try {
        listaUsuario = await usuarioModel.listarUsuario();
    } catch (exception) {
        console.error('Error en listarUsuario Service:', exception);
        listaUsuario = null;
    }
    return listaUsuario;
}

const listarUsuariosActivos = async() => {
    let listaUsuario;
    try {
        listaUsuario = await usuarioModel.listarUsuariosActivos();
    } catch (exception) {
        console.error('Error en listarUsuariosActivos Service:', exception);
        listaUsuario = null;
    }
    return listaUsuario;
}

const listarUsuariosDesactivos = async() => {
    let listaUsuario;
    try {
        listaUsuario = await usuarioModel.listarUsuariosDesactivos();
    } catch (exception) {
        console.error('Error en listarUsuariosDesactivos Service:', exception);
        listaUsuario = null;
    }
    return listaUsuario;
}

const obtenerUsuario = async(idusuario) => {
    let usuarios;
    try {
        usuarios = await usuarioModel.obtenerUsuario(idusuario);
    } catch (exception) {
        console.error('Error en obtenerUsuario Service:', exception);
        usuarios = null;
    }
    return usuarios;
}


module.exports = {
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listarUsuario,
    listarUsuariosActivos,
    listarUsuariosDesactivos,
    obtenerUsuario
}