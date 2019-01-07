const fs = require('fs');
//create a class 
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

// create a class
class TicketControl {

    constructor() {
        this.ultimoTicket = 0;
        this.fechaHoy = new Date().getDate();
        // get data
        let data = require('../data/data');
        // array for tickers
        let tickets = [];
        let losUltimos4 = [];
        // condiciones para restablecer la data

        if (data.fechaHoy === this.fechaHoy) {
            this.ultimoTicket = data.ultimoTicket;
            this.tickets = data.tickets;
            this.losUltimos4 = data.losUltimos4;
        } else {
            // poner el metodo reiniciar el conteo
            this.reiniciarConteo();
        }
    }


    siguienteTicket() {

        this.ultimoTicket += 1;
        // creando un objeto de la clase Ticket para agregar el ultimo ticket y el 
        // escritorio 
        let ticket = new Ticket(this.ultimoTicket, null);
        // here we are storing data into array tickets. 
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${ this.ultimoTicket }`;
    }
    getTicketUltimo() {
        return `Ticket ${ this.ultimoTicket }`;
    }
    getTicketUltimos4() {
        return this.losUltimos4;
    }
    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        // borrar el primer elemento del arreglo tickets Posicion del arreglo 
        this.tickets.shift();
        // numeroTicket toma el primer numero del arreglo y lo ingresamos 
        // al constructor 
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // agregando al inicio del arreglo 
        // va ser la ilucion optica que va empujarlo 
        this.losUltimos4.unshift(atenderTicket);

        if (this.losUltimos4.length > 4) {
            this.losUltimos4.splice(-1, 1); // borra el ultimo elemento
        }
        console.log('Ultimos 4');
        console.log(this.losUltimos4);
        // graba los ultimos movimientos
        this.grabarArchivo();
        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimoTicket = 0;
        this.tickets = [];
        this.losUltimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimoTicket: this.ultimoTicket,
            fechaHoy: this.fechaHoy,
            tickets: this.tickets,
            losUltimos4: this.losUltimos4
        };
        // We have to send all by String so we have to convert
        let jsonDataString = JSON.stringify(jsonData);
        // record to the file data.json

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }


}

module.exports = {

    TicketControl
};