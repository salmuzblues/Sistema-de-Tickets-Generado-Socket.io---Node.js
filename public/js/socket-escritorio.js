//comando para establecer la conexion  o comunicación.
var socket = io();
var searchParams = new URLSearchParams(window.location.search);

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos la conceción con el servidor');
});
// se pone throw new Error porque no estamos en ninguna funcion 
// y no hay un return para parar el app le ponemos esa excepción.
if (!searchParams.has('escritorio')) {
    // redireccionando a la pantalla al index.html
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
// retrive the number of escritorio 
var escritorio = searchParams.get('escritorio');
var label = $('small');
$('h1').text('Escritorio ' + escritorio);
// funcion para realizar el disparo  de atender Ticket 

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});