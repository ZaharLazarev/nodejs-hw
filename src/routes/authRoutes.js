import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
} from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate({ body: registerUserSchema }),
  registerUser,
);

router.post('/auth/login', celebrate({ body: loginUserSchema }), loginUser);

router.post('/auth/refresh', refreshUserSession);

export default router;
