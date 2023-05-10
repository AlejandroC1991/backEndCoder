import mongoose from 'mongoose';

const ticketsCollection = 'tickets';

const TicketSchema = new mongoose.Schema({
    
    code: {
        type: String,
        require: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
        
    },
    purchaser: {
        type: String,
        require: true,
    },
   
});

const ticketModel = mongoose.model(ticketsCollection, TicketSchema);

export default ticketModel;