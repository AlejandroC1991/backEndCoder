import { TICKETSDAO } from "../dao/index.js";


const getTicketsByID = async (id) => {
    const ticketByID = await TICKETSDAO.getTicketsByID({_id:id });
    console.log("asdasdasdasdasdasdas")
    return ticketByID;

}

export {
    getTicketsByID,
}