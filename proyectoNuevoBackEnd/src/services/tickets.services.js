import { TICKETSDAO } from "../dao/index.js";


const getTicketsByID = async (id) => {
    const ticketByID = await TICKETSDAO.getTicketsByID({_id:id });
    return ticketByID;

}

export {
    getTicketsByID,
}