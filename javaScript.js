




var comentarios = [];

function agregarComentario(){
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let comentario = document.getElementById("comentario").value;


    let comen = {"nombre":nombre,
        "correo": correo,
        "comentario":comentario
    };

    comentarios.push(comen);
    limpiarCampos();

}


function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("comentario").value = "";

}