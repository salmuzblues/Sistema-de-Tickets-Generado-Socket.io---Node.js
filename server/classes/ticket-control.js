
const fs = require('fs');
// create a class

class TicketControl {

    constructor(){
        this.ultimoTicket = 0;
        this.fechaHoy = new Date().getDate();
        // get data
        let data = require('../data/data');

        // condiciones para restablecer la data

        if (data.fechaHoy === this.fechaHoy){
             this.ultimoTicket = data.ultimoTicket;
        }else{
         // poner el metodo reiniciar el conteo
            this.reiniciarConteo();
        }
    }


    siguienteTicket(){

        this.ultimoTicket += 1;
        this.grabarArchivo();

        return `Numero de Ticket ${ this.ultimoTicket }`;
    }

    reiniciarConteo(){

        this.ultimoTicket = 0;
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo(){

        let jsonData = {
            ultimoTicket: this.ultimoTicket,
            fechaHoy: this.fechaHoy
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