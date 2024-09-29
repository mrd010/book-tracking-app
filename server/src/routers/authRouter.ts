import { Router } from 'express';
import { signup } from '../controllers/authController';
import { loginFormValidator, signupFormValidator } from '../middlewares/validators/authValidators';
import { validationParser } from '../middlewares/validationParser';

const authRouter = Router();

authRouter.post('/signup', signupFormValidator, validationParser, signup);
authRouter.post('/login', loginFormValidator, validationParser);

export default authRouter;
