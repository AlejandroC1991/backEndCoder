import { Router } from 'express';
import { save, getAll,getCartByID ,deleteCart} from '../controllers/carts.controller.js';


const router = Router();

router.get('/', getAll);
router.get('/:idCarrito', getCartByID);
router.post('/', save);
router.delete('/:idCarrito', deleteCart);
// router.put('/:code', update);



export default router;

