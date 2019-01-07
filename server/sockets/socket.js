const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

/** PARTE DEL SERVIDOR  **/

io.on('connection', (client) => {

    client.on('siguienteTicket', function(data, callback) {
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getTicketUltimo(),
        ultimos4: ticketControl.getTicketUltimos4()
    });
    // Listener 
    client.on('atenderTicket', (data, callback) => {
        // si no existe escritorio 
        if (!data.escritorio) {
            callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        // retrieve the number of atenderTicket 
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        //actualizar/notificar cambios en los ultimos 4
        // vamos a emitir
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getTicketUltimos4()
        });

    });

});