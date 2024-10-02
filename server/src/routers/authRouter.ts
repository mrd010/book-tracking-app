import { Router } from 'express';
import { login, signup } from '../controllers/authController';

import { validationParser } from '../middlewares/validationParser';
import {
  loginFormValidator,
  signupFormValidator,
} from '../middlewares/validators/form-validators/authValidators';

const authRouter = Router();

authRouter.post('/signup', signupFormValidator, validationParser, signup);
authRouter.post('/login', loginFormValidator, validationParser, login);

export default authRouter;
