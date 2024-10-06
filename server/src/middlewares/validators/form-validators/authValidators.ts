import { body, matchedData } from 'express-validator';
import User from '../../../models/User';
import { checkPassword } from '../../../lib/utils';

// general email validator
const emailValidator = () =>
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .isLength({ max: 30 })
    .withMessage('Email length should be at most 30 characters.')
    .bail()
    .isEmail()
    .withMessage('Please provide a correct email address.')
    .escape();

// email validator for signup
const signupEmailValidator = emailValidator()
  .bail()
  .custom(async (value: string) => {
    const user = await User.get({ email: value });
    if (user) {
      throw new Error('Username already exists.');
    }
    return true;
  });

// email validator for login
const loginEmailValidator = emailValidator()
  .bail()
  .custom(async (value: string) => {
    const user = await User.get({ email: value });
    if (!user) {
      throw new Error('User does not exist.');
    }
    return true;
  });

const passwordValidator = () =>
  body('password')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must be between 8 and 32 characters long.')
    .bail()
    .isStrongPassword({
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 0,
      minLength: 8,
    })
    .withMessage('Password must be made from numbers, lowercase and UPPERCASE characters.')
    .escape();

const signupPasswordValidator = passwordValidator();
const loginPasswordValidator = passwordValidator()
  .bail()
  .custom(async (value, { req }) => {
    const { email } = matchedData(req);
    if (email) {
      const user = await User.get({ email });
      if (user) {
        const passwordMatches = await checkPassword(value, user.password);
        if (!passwordMatches) {
          throw new Error('Incorrect password.');
        }
        return true;
      }
    }
  });

const passwordConfirmValidator = body('passwordConfirm').custom((value, { req }) => {
  if (req.body.password === value) return true;
  throw new Error('Password confirm does not match password.');
});

export const signupFormValidator = [
  signupEmailValidator,
  signupPasswordValidator,
  passwordConfirmValidator,
];
export const loginFormValidator = [loginEmailValidator, loginPasswordValidator];
