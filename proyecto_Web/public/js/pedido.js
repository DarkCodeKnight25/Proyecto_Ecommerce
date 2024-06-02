function guardarPedido(){
    $.ajax({
        url: "../api/pedido",
        type: "POST",
        data: {
            fechaentrega : $('#txtFechaEntrega').val(),
            cliente : $('#txtCliente').val(),
            direccion : $('#txtDireccion').val(),
            descripcion : $('#txtDescripcion').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                alert("Se ha registrado el pedido correctamente.");
                $('#txtFechaEntrega').val(""),
                $('#txtCliente').val(""),
                $('#txtDireccion').val(""),
                $('#txtDescripcion').val(""),
                $('#chkEstado').is(':checked')?true:false,  
                listarPedido ();
            }else{
                alert("Error al intentar registrar el pedido");
                listarPedido ();
            }
        }
    });
}
function actualizarPedido(){
    $.ajax({
        url: "../api/pedido/"+$('#txtId').val(),
        type: "PUT",
        data: {
            fechaentrega : $('#txtFechaEntrega').val(),
            cliente : $('#txtCliente').val(),
            direccion : $('#txtDireccion').val(),
            descripcion : $('#txtDescripcion').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.idpedido),
                $('#txtFechaEntrega').val(""),
                $('#txtCliente').val(""),
                $('#txtDireccion').val(""),
                $('#txtDescripcion').val(""),
                $('#chkEstado').is(':checked')?true:false,            
                $('#btnActualizar').hide(),
                $('#btnGrabar').show(),
                alert("Se ha actualizado el pedido correctamente.");                
                listarPedido ();
            }else{
                alert("Error al intentar actualizar el pedido");
                listarPedido ();
            }
        }
    });
}
function eliminarPedido(idpedido){
    $.ajax({
        url: "../api/pedido/"+idpedido,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.estado==0){
                alert("Se ha eliminado el pedido correctamente.");
                listarPedido ();
            }else{
                alert("Error al intentar eliminar el pedido");
                listarPedido ();
            }
        }
    });
}

function seleccionarPedido(idpedido){
    $.ajax({
        url: "../api/pedido/"+idpedido,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.idpedido);
                    $('#txtFechaEntrega').val(result.fechaentrega);
                    $('#txtCliente').val(result.cliente);
                    $('#txtDireccion').val(result.direccion);
                    $('#txtDescripcion').val(result.descripcion);
                    
                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    
                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono el pedido correctamente.");
                }else{
                    alert("Error al intentar seleccionar el pedido");
                }
        }
    });
}

function listarPedido(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/pedido/desactivos",
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
                let tblBody = $("#tblBodyPedido");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td class='center'>"+elemento.idpedido+"</td>"+
                                     "<td>"+elemento.fechaentrega+"</td>"+
                                     "<td class='center'>"+elemento.cliente+"</td>"+
                                     "<td class='center'>"+elemento.direccion+"</td>"+
                                     "<td class='center'>"+elemento.descripcion+"</td>"+
                                     "<td>"+elemento.estado+"</td>"+ 
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarPedido("+elemento.idpedido+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarPedido("+elemento.idpedido+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/pedido/activos",
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
                let tblBody = $("#tblBodyPedido");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                    "<td class='center'>"+elemento.idpedido+"</td>"+
                                    "<td>"+elemento.fechaentrega+"</td>"+
                                    "<td class='center'>"+elemento.cliente+"</td>"+
                                    "<td class='center'>"+elemento.direccion+"</td>"+
                                    "<td class='center'>"+elemento.descripcion+"</td>"+
                                    "<td class='center'>"+elemento.estado+"</td>"+
                                    "<td class='center bg-actualizar'><a href='#' onclick='seleccionarPedido("+elemento.idpedido+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                    "<td class='center bg-eliminar'><a href='#' onclick='eliminarPedido("+elemento.idpedido+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}

listarPedido();