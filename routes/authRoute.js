import { Router } from "express";
import { isAuthenticated, logOutUser } from "../controllers/authenticate.js";

const authRouter = Router();

authRouter.get('/', isAuthenticated);
authRouter.get('/log-out', logOutUser);


export {
    authRouter,
};