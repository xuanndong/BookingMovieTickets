import { Router } from "express";
import { signUpUser } from '../controllers/signup.js';
import { logInUser } from '../controllers/login.js';
import { createValidator } from '../controllers/validatorUser.js';

const signupRouter = Router();

signupRouter.post('/', createValidator, signUpUser, logInUser);

export {
    signupRouter,
};