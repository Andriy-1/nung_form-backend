import { Router } from "express";
import { PostController, StatusController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { statusCreateValidation } from "../validations.js";


const statusRouter = new Router;

statusRouter.get('/status', checkAuth, StatusController.getAll);
statusRouter.post('/status', checkAuth, statusCreateValidation, handleValidationErrors, StatusController.create);
statusRouter.delete('/status/:id', checkAuth, StatusController.remove);



export default statusRouter;