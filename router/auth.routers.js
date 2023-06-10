import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { loginValidation, registerValidation } from "../validations.js";


const authRouter = new Router;

// authRouter.post('/auth/login', AuthController.login);
authRouter.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
authRouter.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
// authRouter.post('/auth/register', AuthController.register);
authRouter.get('/auth/me', checkAuth, AuthController.getMe);

export default authRouter;