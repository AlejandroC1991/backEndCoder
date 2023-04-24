import { Router } from 'express';
import { save, getAll,getProductByCode ,deleteProduct ,updateByCode} from '../controllers/products.controller.js';


const router = Router();

router.get('/', getAll);
router.get('/', getProductByCode);
router.post('/', save);
router.delete('/', deleteProduct);
router.put('/', updateByCode);

export default router;