function guardarUsuario(){
    $.ajax({
        url: "../api/usuario",
        type: "POST",
        data: {
            usuario : $('#txtUsuario').val(),
            password : $('#txtPassword').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                alert("Se ha registrado el usuario correctamente.");
                $('#txtUsuario').val(""),
                $('#txtPassword').val(""),
                $('#chkEstado').is(':checked')?true:false,  
                listarUsuario ();
            }else{
                alert("Error al intentar registrar el usuario");
                listarUsuario ();
            }
        }
    });
}
function actualizarUsuario(){
    $.ajax({
        url: "../api/usuario/"+$('#txtId').val(),
        type: "PUT",
        data: {
            usuario : $('#txtUsuario').val(),
            password : $('#txtPassword').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.idusuario),
                $('#txtUsuario').val(""),
                $('#txtPassword').val(""),
                $('#chkEstado').is(':checked')?true:false,            
                $('#btnActualizar').hide(),
                $('#btnGrabar').show(),
                alert("Se ha actualizado el usuario correctamente.");                
                listarUsuario ();
            }else{
                alert("Error al intentar actualizar el usuario");
                listarUsuario ();
            }
        }
    });
}
function eliminarUsuario(idusuario){
    $.ajax({
        url: "../api/usuario/"+idusuario,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.estado==0){
                alert("Se ha eliminado el usuario correctamente.");
                listarUsuario ();
            }else{
                alert("Error al intentar eliminar el usuario");
                listarUsuario ();
            }
        }
    });
}

function seleccionarUsuario(idusuario){
    $.ajax({
        url: "../api/usuario/"+idusuario,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.idusuario);
                    $('#txtUsuario').val(result.usuario);
                    $('#txtPassword').val(result.password);
                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    
                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono el usuario correctamente.");
                }else{
                    alert("Error al intentar seleccionar el usuario");
                }
        }
    });
}

function listarUsuario(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/usuario/desactivos",
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
                let tblBody = $("#tblBodyUsuario");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td class='center'>"+elemento.idusuario+"</td>"+
                                     "<td>"+elemento.usuario+"</td>"+
                                     "<td class='center'>"+elemento.password+"</td>"+
                                     "<td>"+elemento.estado+"</td>"+ 
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarUsuario("+elemento.idusuario+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarUsuario("+elemento.idusuario+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/usuario/activos",
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
                let tblBody = $("#tblBodyUsuario");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                    "<td class='center'>"+elemento.idusuario+"</td>"+
                                    "<td>"+elemento.usuario+"</td>"+
                                    "<td class='center'>"+elemento.password+"</td>"+
                                    "<td class='center'>"+elemento.estado+"</td>"+
                                    "<td class='center bg-actualizar'><a href='#' onclick='seleccionarUsuario("+elemento.idusuario+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                    "<td class='center bg-eliminar'><a href='#' onclick='eliminarUsuario("+elemento.idusuario+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}

listarUsuario();