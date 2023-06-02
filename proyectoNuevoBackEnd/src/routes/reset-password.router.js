import {
    Router
} from 'express';
import ResetPasswordController from '../controllers/reset-password.controller.js';

const router = Router();


router.post('/reset-password', ResetPasswordController.forgotPasswordHandler)
console.log("hasta el router llegamos");

export default router;