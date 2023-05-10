import { Router } from 'express';
import { getTicketsByID } from '../controllers/tickets.controller.js';


const router = Router();


router.get('/:cid', getTicketsByID);


export default router;