import { Router } from "express";
import { KursController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { kursCreateValidation } from "../validations.js";


const kursRouter = new Router;

kursRouter.get('/kurs', checkAuth, KursController.getAll);
kursRouter.post('/kurs', checkAuth, kursCreateValidation, handleValidationErrors, KursController.create);
kursRouter.delete('/kurs/:id', checkAuth, KursController.remove);



export default kursRouter;