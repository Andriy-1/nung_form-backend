import { Router } from "express";
import { SpecialtyController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { specialtyCreateValidation } from "../validations.js";


const specialtyRouter = new Router;

specialtyRouter.get('/specialty', checkAuth, SpecialtyController.getAll);
specialtyRouter.post('/specialty', checkAuth, specialtyCreateValidation, handleValidationErrors, SpecialtyController.create);
specialtyRouter.delete('/specialty/:id', checkAuth, SpecialtyController.remove);



export default specialtyRouter;