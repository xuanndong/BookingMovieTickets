import { Router } from "express";
import signUpUser from '../controllers/signup.js';
import logInUser from '../controllers/login.js';
import valid from '../controllers/validatorUser.js';

const signupRouter = Router();

signupRouter.post('', valid.createValidator, signUpUser.createAccount, logInUser.loginAccount);

export default {
    signupRouter,
};