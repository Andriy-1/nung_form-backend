import { Router } from "express";
import { AnswerOptionsController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { answerCreateValidation } from "../validations.js";


const answerOptionsRouter = new Router;

answerOptionsRouter.get('/answer', checkAuth, AnswerOptionsController.getAll);
// answerOptionsRouter.get('/question/three', AnswerOptionsController.getThree);
answerOptionsRouter.post('/answer', checkAuth, answerCreateValidation, handleValidationErrors, AnswerOptionsController.create);
answerOptionsRouter.delete('/answer/:id', checkAuth, AnswerOptionsController.remove);
answerOptionsRouter.patch('/answer/:id', checkAuth, answerCreateValidation, handleValidationErrors, AnswerOptionsController.updateText);
answerOptionsRouter.patch('/answer_option', checkAuth, AnswerOptionsController.updateType);

export default answerOptionsRouter;