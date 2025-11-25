import { MongoRoleRepo } from '@modules/auth/repos/mongoRoleRepo';
import { AuthService } from '@modules/auth/services/authService';
import { GoogleAuthService } from '@modules/auth/services/googleAuthService';
import { MailService } from '@modules/auth/services/mailService';
import { ForgotPasswordController } from '@modules/auth/useCases/forgotPassword/ForgotPasswordController';
import { ForgotPasswordUseCase } from '@modules/auth/useCases/forgotPassword/ForgotPasswordUseCase';
import { GetMeController } from '@modules/auth/useCases/getMe/GetMeController';
import { GetMeUseCase } from '@modules/auth/useCases/getMe/GetMeUseCase';
import { LoginController } from '@modules/auth/useCases/login/LoginController';
import { LoginUseCase } from '@modules/auth/useCases/login/LoginUseCase';
import { LoginWithGoogleController } from '@modules/auth/useCases/loginWithGoogle/LoginWithGoogleController';
import { LoginWithGoogleUseCase } from '@modules/auth/useCases/loginWithGoogle/LoginWithGoogleUseCase';
import { RefreshTokenController } from '@modules/auth/useCases/refreshToken/RefreshTokenController';
import { RefreshTokenUseCase } from '@modules/auth/useCases/refreshToken/RefreshTokenUseCase';
import { RegisterController } from '@modules/auth/useCases/register/RegisterController';
import { RegisterUseCase } from '@modules/auth/useCases/register/RegisterUseCase';
import { ResetPasswordController } from '@modules/auth/useCases/resetPassword/ResetPasswordController';
import { ResetPasswordUseCase } from '@modules/auth/useCases/resetPassword/ResetPasswordUseCase';
import { VerifyEmailController } from '@modules/auth/useCases/verifyEmail/VerifyEmailController';
import { VerifyEmailUseCase } from '@modules/auth/useCases/verifyEmail/VerifyEmailUseCase';
import { mongoUserRepo } from '@modules/users/useCases';

const mailService = new MailService();
const authService = new AuthService();
const googleAuthService = new GoogleAuthService();
const mongoRoleRepo = new MongoRoleRepo();

const loginUseCase = new LoginUseCase(
  mongoUserRepo,
  mongoRoleRepo,
  authService,
);
const loginController = new LoginController(loginUseCase);

const registerUseCase = new RegisterUseCase(
  mongoUserRepo,
  mongoRoleRepo,
  mailService,
);
const registerController = new RegisterController(registerUseCase);

const refreshTokenUseCase = new RefreshTokenUseCase(
  mongoUserRepo,
  mongoRoleRepo,
  authService,
);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

const verifyEmailUseCase = new VerifyEmailUseCase(mongoUserRepo);
const verifyEmailController = new VerifyEmailController(verifyEmailUseCase);

const loginWithGoogleUseCase = new LoginWithGoogleUseCase(
  mongoUserRepo,
  mongoRoleRepo,
  authService,
  googleAuthService,
);
const loginWithGoogleController = new LoginWithGoogleController(
  loginWithGoogleUseCase,
);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  mongoUserRepo,
  mailService,
);
const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

const resetPasswordUseCase = new ResetPasswordUseCase(mongoUserRepo);
const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase,
);

const getMeUseCase = new GetMeUseCase(mongoUserRepo);
const getMeController = new GetMeController(getMeUseCase);

export {
  forgotPasswordController,
  getMeController,
  loginController,
  loginWithGoogleController,
  mongoRoleRepo,
  refreshTokenController,
  registerController,
  resetPasswordController,
  verifyEmailController,
};
