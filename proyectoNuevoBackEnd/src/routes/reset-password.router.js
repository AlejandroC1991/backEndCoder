import {
    Router
} from 'express';
import * as ResetPasswordController from '../controllers/reset-password.controller.js';

const router = Router();


router.post('/reset-password', ResetPasswordController.default);

export default router;