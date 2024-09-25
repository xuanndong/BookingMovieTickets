import { Router } from "express";
import controller from '../controllers/signup.js';

const createAccount = Router();

createAccount.get('/', controller.indexDeisgn);
createAccount.post('/signup', controller.createAccountsPost);

export default {
    createAccount,
};