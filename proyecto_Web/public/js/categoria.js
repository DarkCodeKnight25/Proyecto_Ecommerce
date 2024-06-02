function guardarCategoria(){
    $.ajax({
        url: "../api/categoria",
        type: "POST",
        data: {
            nombre : $('#txtNomCat').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                alert("Se ha registrado la categoria correctamente.");
                $('#txtNomCat').val(""),
                $('#chkEstado').is(':checked')?true:false,  
                listarCategoria ();
            }else{
                alert("Error al intentar registrar la categoria");
                listarCategoria ();
            }
        }
    });
}
function actualizarCategoria(){
    $.ajax({
        url: "../api/categoria/"+$('#txtId').val(),
        type: "PUT",
        data: {
            nombre : $('#txtNomCat').val(),
            estado : $('#chkEstado').is(':checked')?true:false,            
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.codcategoria),
                $('#txtNomCat').val(""),
                $('#chkEstado').is(':checked')?true:false,            
                $('#btnActualizar').hide(),
                $('#btnGrabar').show(),
                alert("Se ha actualizado la categoria correctamente.");                
                listarCategoria ();
            }else{
                alert("Error al intentar actualizar la categoria");
                listarCategoria ();
            }
        }
    });
}
function eliminarCategoria(codcategoria){
    $.ajax({
        url: "../api/categoria/"+codcategoria,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.estado==0){
                alert("Se ha eliminado la categoria correctamente.");
                listarCategoria ();
            }else{
                alert("Error al intentar eliminar la categoria");
                listarCategoria();
            }
        }
    });
}

function seleccionarCategoria(codcategoria){
    $.ajax({
        url: "../api/categoria/"+codcategoria,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.codcategoria);
                    $('#txtNomCat').val(result.nombre);
                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    
                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono la categoria correctamente.");
                }else{
                    alert("Error al intentar seleccionar la categoria");
                }
        }
    });
}

function listarCategoria(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/categoria/desactivos",
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
                let tblBody = $("#tblBodyCategoria");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td class='center'>"+elemento.codcategoria+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td>"+elemento.estado+"</td>"+ 
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarCategoria("+elemento.codcategoria+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarCategoria("+elemento.codcategoria+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/categoria/activos",
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
                let tblBody = $("#tblBodyCategoria");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                    "<td class='center'>"+elemento.codcategoria+"</td>"+
                                    "<td>"+elemento.nombre+"</td>"+
                                    "<td class='center'>"+elemento.estado+"</td>"+
                                    "<td class='center bg-actualizar'><a href='#' onclick='seleccionarCategoria("+elemento.codcategoria+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                    "<td class='center bg-eliminar'><a href='#' onclick='eliminarCategoria("+elemento.codcategoria+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}

listarCategoria();