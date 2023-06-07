import {
    Router
} from 'express';
import * as ResetPasswordController from '../controllers/reset-password.controller.js';

const router = Router();


router.post('/reset-password', ResetPasswordController.default);
console.log("llega al router")

export default router;