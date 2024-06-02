function guardarProducto(){
    $.ajax({
        url: "../api/productos",
        type: "POST",
        data: {
            nombre : $('#txtNombre').val(),
            idproveedor : $('#selProveedores').val(),
            marca: $('#txtMarca').val(),
            modelo: $('#txtModelo').val(),
            color: $('#txtColor').val(),
            costo : parseFloat($('#txtCosto').val()),
            precio : parseFloat($('#txtPrecio').val()),
            stock : parseInt($('#txtStock').val()),
            estado : $('#chkEstado').is(':checked')?true:false,
            descripcion: $('#txtDescripcion').val(),
            name_file : $('#name_file').val() //para capturar el id de la imagen
        },
        success: function(result) {
            if(result.estado){               
                alert("Se ha registrado el producto correctamente.");
                listarProducto ();
                $('#txtNombre').val("");
                $('#selProveedores').val(0),
                $('#txtMarca').val("");
                $('#txtModelo').val("");
                $('#txtColor').val("");
                $('#txtCosto').val("");
                $('#txtPrecio').val("");
                $('#txtStock').val("");
                $("#chkEstado").prop('checked', false).change();
                $('#txtDescripcion').val(""),
                $('#name_file').val("")
            }else{
                alert("Error al intentar registrar el producto");
                listarProducto ();
            }
        }
    });
}
function actualizarProducto(){
    $.ajax({
        url: "../api/productos/"+$('#txtId').val(),
        type: "PUT",
        data: {
            nombre : $('#txtNombre').val(),
            idproveedor : $('#selProveedores').val(),
            marca: $('#txtMarca').val(),
            modelo: $('#txtModelo').val(),
            color: $('#txtColor').val(),
            costo : parseFloat($('#txtCosto').val()),
            precio : parseFloat($('#txtPrecio').val()),
            stock : parseInt($('#txtStock').val()),
            estado : $('#chkEstado').is(':checked')?true:false,
            descripcion: $('#txtDescripcion').val()
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.id);
                $('#txtNombre').val("");
                $('#selProveedores').val(0),
                $('#txtMarca').val("");
                $('#txtModelo').val("");
                $('#txtColor').val("");
                $('#txtCosto').val("");
                $('#txtPrecio').val("");
                $('#txtStock').val("");
                $("#chkEstado").prop('checked', false).change();
                $('#txtDescripcion').val(""),
                $('#name_file').val(""),
                $('#btnActualizar').hide(),
                $('#btnGrabar').show(),
                alert("Se ha actualizado el producto correctamente.");                
                listarProducto ();
            }else{
                alert("Error al intentar actualizar el producto");
                listarProducto ();
            }
        }
    });
}
function eliminarProducto(id){
    $.ajax({
        url: "../api/productos/"+id,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.estado==0){
                alert("Se ha eliminado el producto correctamente.");
                listarProducto ();
            }else{
                alert("Error al intentar eliminar el producto");
                listarProducto ();
            }
        }
    });
}
function optionProveedores() {
    $.ajax({
        url: "../api/proveedores/",
        type: "GET",
        data: {
        },
        success: function(result) {
            let lista=null;
            if (Array.isArray(result)) {
                lista = result;
            } else {
                lista = JSON.parse(result);
            }
            let selProv = $("#selProveedores");          
            selProv.empty();
            selProv.append('<option value="0"> -- Seleccionar Proveedor -- </option>');
            lista.forEach(function (elemento) {
                let opciones =  '<option value="'+ elemento.idproveedores +'">'+ elemento.nombre +'</option>';
                selProv.append(opciones);
            });
        }
    });
}
optionProveedores();

function seleccionarProducto(id){
    $.ajax({
        url: "../api/productos/"+id,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.id);
                    $('#txtNombre').val(result.nombre);
                    $('#selProveedores').val(result.idproveedor);
                    $('#txtMarca').val(result.marca);
                    $('#txtModelo').val(result.modelo);
                    $('#txtColor').val(result.color);
                    $('#txtCosto').val(result.costo);
                    $('#txtPrecio').val(result.precio);
                    $('#txtStock').val(result.stock);
                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    $('#txtDescripcion').val(result.descripcion),
                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono el producto correctamente.");
                }else{
                    alert("Error al intentar seleccionar el producto");
                }
        }
    });
}

function listarProducto(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/productos/desactivos",
            type: "GET",
            data: {
            },
            success: function(result) {
                let lista=null;
                if (Array.isArray(result)) {
                    lista = result;
                } else {
                    lista = JSON.parse(result);
                }
                let tblBody = $("#tblBodyProducto");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td>"+elemento.id+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td>"+elemento.marca+"</td>"+
                                     "<td class='right'>"+elemento.costo+"</td>"+
                                     "<td class='right'>"+elemento.precio+"</td>"+
                                     "<td class='center'>"+elemento.stock+"</td>"+
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarProducto("+elemento.id+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarProducto("+elemento.id+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/productos/activos",
            type: "GET",
            data: {
            },
            success: function(result) {
                let lista=null;
                if (Array.isArray(result)) {
                    lista = result;
                } else {
                    lista = JSON.parse(result);
                }
                let tblBody = $("#tblBodyProducto");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td>"+elemento.id+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td>"+elemento.marca+"</td>"+
                                     "<td class='right'>"+elemento.costo+"</td>"+
                                     "<td class='right'>"+elemento.precio+"</td>"+
                                     "<td class='center'>"+elemento.stock+"</td>"+
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarProducto("+elemento.id+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarProducto("+elemento.id+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}

listarProducto();


