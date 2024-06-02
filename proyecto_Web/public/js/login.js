function login (){
    $.ajax({
        url: "../api/login",
        type: "POST",
        data: {
            usuario : $('#txtUsuario').val(),
            password : $('#txtPassword').val(),
        },
        success: function(result) {
            if(result.idusuario>0){
                $.ajax({
                    url: "../userlogin",
                    type: "POST",
                    data: {
                        usuario : result.usuario
                    },
                    success: function(result) {
                        if(result.resultado){
                            window.location.href = "/rusuario";
                        }
                    }
                });
            }
        }
    });
}