import { Router } from 'express';
import { getByEmail, save } from '../controllers/users.controller.js';

const router = Router();

router.get('/', getByEmail);
router.post('/', save);

export default router;