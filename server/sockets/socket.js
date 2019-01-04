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
        actual: ticketControl.getTicketUltimo()
    });
});