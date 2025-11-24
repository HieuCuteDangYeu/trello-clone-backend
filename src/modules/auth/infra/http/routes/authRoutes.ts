import {
  forgotPasswordController,
  loginController,
  loginWithGoogleController,
  refreshTokenController,
  registerController,
  resetPasswordController,
  verifyEmailController,
} from '@modules/auth/useCases';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/login', (req, res) => loginController.execute(req, res));
authRouter.post('/register', (req, res) =>
  registerController.execute(req, res),
);
authRouter.get('/verify-email', (req, res) =>
  verifyEmailController.execute(req, res),
);
authRouter.post('/refresh-token', (req, res) =>
  refreshTokenController.execute(req, res),
);
authRouter.post('/google', (req, res) =>
  loginWithGoogleController.execute(req, res),
);
authRouter.post('/forgot-password', (req, res) =>
  forgotPasswordController.execute(req, res),
);
authRouter.post('/reset-password', (req, res) =>
  resetPasswordController.execute(req, res),
);

export { authRouter };
