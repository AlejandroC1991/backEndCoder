import  ticketModel  from './models/tickets.js';

export default class Tickets {
    constructor() {
        console.log('Tickets con DB en Mongo');
    }

    getTicketsByID = async (id) => {
        const ticketByID = await ticketModel.findOne(id);
        return ticketByID;

    }
}
