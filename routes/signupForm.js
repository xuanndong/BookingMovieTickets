import { Router } from "express";
import controller from '../controllers/signup.js';

const createAccount = Router();

createAccount.post('', controller.createAccount);

export default {
    createAccount,
};