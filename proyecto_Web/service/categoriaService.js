const categoriaModel = require("../database/categoriaModel");

const crearCategoria = async(nombre,estado) => {
    let categorias = null;
    try {
        categorias = await categoriaModel.crearCategoria(nombre,estado );
    } catch (exception) {
        console.error('Error en crearCategoria Service:', exception);
        categorias = null;
    }
    return categorias;
}

const actualizarCategoria = async(codcategoria,nombre,estado) => {
    let categorias = null;
    try {
        categorias = await categoriaModel.actualizarCategoria(codcategoria,nombre,estado);   
    } catch (exception) {
        console.error('Error en actualizarCategorias Service:', exception);
        categorias = null;
    }
    return categorias;
}

const eliminarCategoria = async(codcategoria) => {
    let categorias = null;
    try {
        categorias = await categoriaModel.eliminarCategoria(codcategoria);       
    } catch (exception) {
        console.error('Error en eliminarCategoria Service:', exception);
        categorias = null;
    }
    return categorias;
}


const listarCategoria = async() => {
    let listaCategoria;
    try {
        listaCategoria = await categoriaModel.listarCategoria();
    } catch (exception) {
        console.error('Error en listaCategoria Service:', exception);
        listaCategoria = null;
    }
    return listaCategoria;
}

const listarCategoriaActivos = async() => {
    let listaCategoria;
    try {
        listaCategoria = await categoriaModel.listarCategoriaActivos();
    } catch (exception) {
        console.error('Error en listarCategoriaActivos Service:', exception);
        listaCategoria = null;
    }
    return listaCategoria;
}

const listarCategoriaDesactivos = async() => {
    let listaCategoria;
    try {
        listaCategoria = await categoriaModel.listarCategoriaDesactivos();
    } catch (exception) {
        console.error('Error en listarCategoriaDesactivos Service:', exception);
        listaCategoria = null;
    }
    return listaCategoria;
}

const obtenerCategoria = async(codcategoria) => {
    let categorias;
    try {
        categorias = await categoriaModel.obtenerCategoria(codcategoria);
    } catch (exception) {
        console.error('Error en obtenerCategoria Service:', exception);
        categorias = null;
    }
    return categorias;
}


module.exports = {
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    listarCategoria,
    listarCategoriaActivos,
    listarCategoriaDesactivos,
    obtenerCategoria
}