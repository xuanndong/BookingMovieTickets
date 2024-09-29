import { Router } from "express";
import controller from "../controllers/login.js";

const loginRouter = Router();
loginRouter.post('', controller.loginAccount);


export default {
    loginRouter,
};