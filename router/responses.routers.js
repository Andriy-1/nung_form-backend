import { Router } from "express";
import { ResponsesController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { questionCreateValidation } from "../validations.js";


const responsesRouter = new Router;

responsesRouter.get('/response', checkAuth, ResponsesController.getAll);
responsesRouter.get('/response/one', ResponsesController.getOne);
responsesRouter.post('/response', checkAuth, handleValidationErrors, ResponsesController.create);
responsesRouter.delete('/response/:id', checkAuth, ResponsesController.remove);
responsesRouter.delete('/response/thema/:id', checkAuth, ResponsesController.removeAllThema);
responsesRouter.delete('/response/specialty/:id', checkAuth, ResponsesController.removeAllSpecialty);
responsesRouter.delete('/response/status/:id', checkAuth, ResponsesController.removeAllStatus);
responsesRouter.delete('/response/kurs/:id', checkAuth, ResponsesController.removeAllKurs);
responsesRouter.patch('/response/:id', checkAuth, handleValidationErrors, ResponsesController.update);
// responsesRouter.patch('/response/:id', checkAuth, ResponsesController.updateType);

export default responsesRouter;