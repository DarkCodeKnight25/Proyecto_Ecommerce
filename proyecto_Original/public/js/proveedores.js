function guardarProveedores(){
    $.ajax({
        url: "../api/proveedores",
        type: "POST",
        data: {
            nombre : $('#txtNombre').val(),
            direccion : $('#txtDireccion').val(),
            razon : $('#txtRazon').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                alert("Se ha registrado el proveedores correctamente.");
                $('#txtNombre').val(""),
                $('#txtDireccion').val(""),
                $('#txtrazon').val(""),
                $('#chkEstado').is(':checked')?true:false,
                listarProveedores ();
            }else{
                alert("Error al intentar registrar el proveedores");
                listarProveedores ();
            }
        }
    });
}
function actualizarProveedores(){
    $.ajax({
        url: "../api/proveedores/"+$('#txtId').val(),
        type: "PUT",
        data: {
            nombre : $('#txtNombre').val(),
            direccion : $('#txtDireccion').val(),
            razon : $('#txtRazon').val(),
            estado : $('#chkEstado').is(':checked')?true:false,             
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.idproveedores);
                $('#txtNombre').val(""),
                $('#txtDireccion').val(""),
                $('#txtRazon').val(""),
                $('#chkEstado').is(':checked')?true:false;            
                $('#btnActualizar').hide(),
                $('#btnGrabar').show();
                alert("Se ha actualizado el proveedores correctamente.");               
                listarProveedores ();
            }else{
                alert("Error al intentar actualizar el proveedores");
                listarProveedores ();
            }
        }
    });
}
function eliminarProveedores(idproveedores){
    $.ajax({
        url: "../api/proveedores/"+idproveedores,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.estado==0){
                alert("Se ha eliminado el proveedores correctamente.");
                listarProveedores ();
            }else{
                alert("Error al intentar eliminar el usuario");
                listarProveedores ();
            }
        }
    });
}

function seleccionarProveedores(idproveedores){
    $.ajax({
        url: "../api/proveedores/"+idproveedores,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.idproveedores);
                    $('#txtNombre').val(result.nombre);
                    $('#txtDireccion').val(result.direccion);
                    $('#txtRazon').val(result.razon);
                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    
                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono el proveedores correctamente.");
                }else{
                    alert("Error al intentar seleccionar el proveedores");
                }
        }
    });
}

function listarProveedores(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/proveedores/desactivos",
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
                let tblBody = $("#tblBodyProveedores");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td class='center'>"+elemento.idproveedores+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td>"+elemento.direccion+"</td>"+
                                     "<td>"+elemento.razon+"</td>"+
                                     "<td>"+elemento.estado+"</td>"+ 
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarProveedores("+elemento.idproveedores+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarProveedores("+elemento.listarProveedores+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/proveedores/activos",
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
                let tblBody = $("#tblBodyProveedores");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                    "<td class='center'>"+elemento.idproveedores+"</td>"+
                                    "<td>"+elemento.nombre+"</td>"+
                                    "<td>"+elemento.direccion+"</td>"+
                                    "<td>"+elemento.razon+"</td>"+
                                    "<td class='center'>"+elemento.estado+"</td>"+
                                    "<td class='center bg-actualizar'><a href='#' onclick='seleccionarProveedores("+elemento.idproveedores+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                    "<td class='center bg-eliminar'><a href='#' onclick='eliminarProveedores("+elemento.idproveedores+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}

listarProveedores();