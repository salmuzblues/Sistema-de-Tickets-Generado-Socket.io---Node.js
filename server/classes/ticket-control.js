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
        // condiciones para restablecer la data

        if (data.fechaHoy === this.fechaHoy) {
            this.ultimoTicket = data.ultimoTicket;
            this.tickets = data.tickets;
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
    reiniciarConteo() {

        this.ultimoTicket = 0;
        this.tickets = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimoTicket: this.ultimoTicket,
            fechaHoy: this.fechaHoy,
            tickets: this.tickets
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