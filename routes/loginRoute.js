import { Router } from "express";
import { logInUser } from "../controllers/login.js";

const loginRouter = Router();

loginRouter.post('', logInUser);

export {
    loginRouter,
};