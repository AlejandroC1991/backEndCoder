export default class TicketsDao {
    constructor() {
        this.data = [];
    }

    getTicketsByID = async (id) => {
        return this.data(id);
    }

}
