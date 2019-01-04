
/** PARTE DEL CLIENTE o Front End  **/

// comando para establecer la conexion
var socket = io();

// making a reference from nuevo-ticket.html
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
   console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Perdimos la conceción con el servidor');
});

$('button').on('click', function () {
    // al emitir realizamos un call back para poder capturar el siguiente ticket, el numero
    //que nos da la parte del servidor
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
      // lo vamos a mostrar en el label usando el lenguaje Jquery
        label.text(siguienteTicket);
    });
});