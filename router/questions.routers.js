import { Router } from "express";
import { QuestionsController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { questionCreateValidation } from "../validations.js";


const questionsRouter = new Router;

questionsRouter.get('/question', checkAuth, QuestionsController.getAll);
// questionsRouter.get('/question/three', QuestionsController.getThree);
questionsRouter.post('/question', checkAuth, questionCreateValidation, handleValidationErrors, QuestionsController.create);
questionsRouter.delete('/question/:id', checkAuth, QuestionsController.remove);
questionsRouter.patch('/question/:id', checkAuth, questionCreateValidation, handleValidationErrors, QuestionsController.updateText);
questionsRouter.patch('/question/is/:id', checkAuth, QuestionsController.updateMendatory);

export default questionsRouter;