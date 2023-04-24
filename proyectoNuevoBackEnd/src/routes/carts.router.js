import { Router } from 'express';
import { save, getAll,getProductByCode ,deleteProduct} from '../controllers/carts.controller.js';


const router = Router();

router.get('/', getAll);
router.get('/', getProductByCode);
router.post('/', save);
router.delete('/', deleteProduct);


export default router;

