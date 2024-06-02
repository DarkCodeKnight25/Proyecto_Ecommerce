function guardarVenta(){
    $.ajax({
        url: "../api/venta",   // ojo 
        type: "POST",
        data: {
            usuario : $('#txtNombre').val(),
            codigo : ($('#txtCodigo').val()),
            producto: ($('#txtProducto').val()),
            precioproducto: parseFloat($('#txtPrecioP').val()),
            preciototal: parseFloat($('#txtPrecioT').val()),
            estado : $('#chkEstado').is(':checked')?true:false,            
            
        },
        success: function(result) {
            if(result.estado){               
                alert("Se ha registrado el venta correctamente.");
              //  listarVenta ();
                $('#txtNombre').val("");
                $('#txtCodigo').val("");
                $('#txtProducto').val("");
                $('#txtPrecioP').val("");
                $('#txtPrecioT').val("");
                $('#chkEstado').is(':checked')?true:false,
                listarVenta ();       
               
            }else{
                alert("Error al intentar registrar la venta");
                listarVenta ();
            }
        }
    });
}
function actualizarVenta(){
    $.ajax({
        url: "../api/venta/"+$('#txtId').val(),
        type: "PUT",
        data: {
            usuario : $('#txtNombre').val(),
            codigo : ($('#txtCodigo').val()),
            producto: ($('#txtProducto').val()),
            precioproducto: parseFloat($('#txtPrecioP').val()),
            preciototal: parseFloat($('#txtPrecioT').val()),
            estado : $('#chkEstado').is(':checked')?true:false,  
        },
        success: function(result) {
            if(result.estado){
                $('#txtId').val(result.idventa);
                $('#txtNombre').val("");
                $('#txtCodigo').val("");
                $('#txtProducto').val("");
                $('#txtPrecioP').val("");
                $('#txtPrecioT').val("");
                $("#chkEstado").prop('checked', false).change();          
                
                alert("Se ha actualizado el producto correctamente.");                
                listarVenta ();
            }else{
                alert("Error al intentar actualizar el producto");
                listarVenta ();
            }
        }
    });
}


function eliminarVenta(idventa){
    $.ajax({
        url: "../api/venta/"+idventa,
        type: "DELETE",
        data: {
        },
        success: function(result) {
            if(result.estado==0){
                alert("Se ha eliminado la venta correctamente.");
                listarVenta ();
            }else{
                alert("Error al intentar eliminar la venta");
                listarVenta ();
            }
        }
    });
}

function seleccionarVenta(idventa){
    $.ajax({
        url: "../api/venta/"+idventa,
        type: "GET",
        data: {
        },
        success: function(result) {
                if(result!=null){
                    $('#txtId').val(result.idventa);
                    $('#txtNombre').val(result.nombre);
                    $('#txtCodigo').val(result.codigo);
                    $('#txtProducto').val(result.producto);
                    $('#txtPrecioP').val(result.precioproducto);
                    $('#txtPrecioT').val(result.preciototal);



                    if(result.estado){
                     $("#chkEstado").prop('checked', true).change();
                    }else{
                     $("#chkEstado").prop('checked', false).change();
                    }
                    

                    $('#btnGrabar').hide(),
                    $('#btnActualizar').show(),
                    alert("Se selecciono la venta correctamente.");
                }else{
                    alert("Error al intentar seleccionar la venta");
                }
        }
    });
}

function listarVenta(){
    if($('#chkEliminados').is(':checked')){
        $.ajax({
            url: "../api/venta/desactivos",
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
                let tblBody = $("#tblBodyVenta");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                                     "<td>"+elemento.idventa+"</td>"+
                                     "<td>"+elemento.nombre+"</td>"+
                                     "<td class='right'>"+elemento.codigo+"</td>"+
                                     "<td class='right'>"+elemento.producto+"</td>"+
                                     "<td class='right'>"+elemento.precioproducto+"</td>"+
                                     "<td class='right'>"+elemento.preciototal+"</td>"+

                                     "<td class='center'>"+elemento.estado+"</td>"+
                                     "<td class='center bg-actualizar'><a href='#' onclick='seleccionarVenta("+elemento.idventa+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                                     "<td class='center bg-eliminar'><a href='#' onclick='eliminarVenta("+elemento.idventa+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                 "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }else{
        $.ajax({
            url: "../api/venta/activos",
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
                let tblBody = $("#tblBodyVenta");          
                tblBody.empty();
                lista.forEach(function (elemento) {
                    let fila = "<tr>"+
                    "<td>"+elemento.idventa+"</td>"+
                    "<td class='right'>"+elemento.codigo+"</td>"+
                    "<td class='right'>"+elemento.producto+"</td>"+
                    "<td class='right'>"+elemento.precioproducto+"</td>"+
                    "<td class='right'>"+elemento.preciototal+"</td>"+
                    "<td class='center'>"+elemento.estado+"</td>"+
                    "<td class='center bg-actualizar'><a href='#' onclick='seleccionarVenta("+elemento.idventa+")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i> Actualizar</a></td>"+
                    "<td class='center bg-eliminar'><a href='#' onclick='eliminarVenta("+elemento.idventa+")'><i class='fa fa-trash-o' aria-hidden='true'></i> Eliminar</a></td>"+
                                           "</tr>";
                    tblBody.append(fila);
                });
            }
        });
    }
    
}
listarVenta();


