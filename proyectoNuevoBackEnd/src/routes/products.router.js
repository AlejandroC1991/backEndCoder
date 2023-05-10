import { Router } from 'express';
import { save, getAll,getProductByCode ,deleteProduct ,updateByCode} from '../controllers/products.controller.js';


const router = Router();

router.get('/', getAll);
router.get('/:code', getProductByCode);
router.post('/', save);
router.delete('/:code', deleteProduct);
router.put('/:code', updateByCode);

export default router;