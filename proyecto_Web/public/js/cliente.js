function guardarCliente(){
    $.ajax({
        url: "../api/clientes",
        type: "POST",
        data: {
            nombre : $('#txtNombre').val(),
            telefono : ($('#txtTelefono').val()),
            email : $('#txtEmail').val(),           
            direccion: $('#txtDireccion').val(),
            estado : $('#chkEstado').is(':checked')?true:false,
            
        },
        success: function(result) {
            if(result.email){
                alert("Se ha registrado el cliente correctamente.");
                listarClientes();
            }else{
                alert("Error al intentar registrar el cliente");
                listarClientes();
            }
        }
    });
}
function actualizarCliente(){
    $.ajax({
        url: "../api/clientes/"+$('#txtId').val(),
        type: "PUT",
        data: {
            nombre : $('#txtNombre').val(),
            telefono : $('#txtTelefono').val(),
            email : $('#txtEmail').val(),           
            direccion: $('#txtDireccion').val(),
            estado : $('#chkEstado').is(':checked')?true:false,
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.id);
                $('#txtNombre').val("");
                $('#txtTelefono').val("");
                $('#txtEmail').val("");
                $('#txtDireccion').val(""),
                $("#chkEstado").prop('checked', false).change();
                $('#btnActualizar').hide(),
                $('#btnGrabar').show(),
                alert("Se ha actualizado el cliente correctamente.");                
                listarClientes();
            }else{
                alert("Error al intentar actualizar el cliente");
                listarCliente();
            }
        }
    });
}
function eliminarCliente(id){
    $.ajax({
        url: "../api/clientes/"+id,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.email==0){
                alert("Se ha eliminado el cliente correctamente.");
                listarClientes();
            }else{
                alert("Error al intentar eliminar el cliente");
                listarClientes();
            }
        }
    });
}

function seleccionarCliente(id){
    $.ajax({
        url: "../api/clientes/"+id,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.id);
                    $('#txtNombre').val(result.nombre);
                    $('#txtTelefono').val(result.telefono);
                    $('#txtEmail').val(result.email);
                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    $('#txtDireccion').val(result.direccion),
                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono el cliente correctamente.");
                }else{
                    alert("Error al intentar seleccionar el cliente");
                }
        }
    });
}

function listarClientes(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/clientes/desactivos",
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
                let tblBody = $("#tblBodyCliente");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td>"+elemento.id+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td>"+elemento.telefono+"</td>"+
                                     "<td>"+elemento.email+"</td>"+
						             "<td>"+elemento.direccion+"</td>"+
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarCliente("+elemento.id+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarCliente("+elemento.id+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/clientes/activos",
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
                let tblBody = $("#tblBodyCliente");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td>"+elemento.id+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td>"+elemento.telefono+"</td>"+
                                     "<td>"+elemento.email+"</td>"+
						             "<td>"+elemento.direccion+"</td>"+
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarCliente("+elemento.id+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarCliente("+elemento.id+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}

listarClientes();

