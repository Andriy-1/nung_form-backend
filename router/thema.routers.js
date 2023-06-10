import { Router } from "express";
import { ThemaController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { themaCreateValidation } from "../validations.js";


const themaRouter = new Router;

themaRouter.get('/thema',checkAuth, ThemaController.getAll);
// themaRouter.get('/thema/three', ThemaController.getThree);
// themaRouter.post('/thema', checkAuth, themaCreateValidation, handleValidationErrors, ThemaController.create);
themaRouter.delete('/thema/:id', checkAuth, ThemaController.remove);
themaRouter.patch('/thema/:id', checkAuth, themaCreateValidation, handleValidationErrors, ThemaController.update);

export default themaRouter;