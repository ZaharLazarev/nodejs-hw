import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate({ body: registerUserSchema }),
  registerUser,
);

router.post('/auth/login', celebrate({ body: loginUserSchema }), loginUser);

router.post('/auth/refresh', refreshUserSession);

router.post('/auth/logout', logoutUser);

router.post(
  '/auth/request-reset-email',
  celebrate({ body: requestResetEmailSchema }),
  requestResetEmail,
);

router.post(
  '/reset-password',
  celebrate({ body: resetPasswordSchema }),
  resetPassword,
);

export default router;
