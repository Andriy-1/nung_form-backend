import { Router } from "express";
import { PostController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { postCreateValidation } from "../validations.js";


const postFormRouter = new Router;

postFormRouter.get('/posts',checkAuth, PostController.getAll);
postFormRouter.get('/posts/three', PostController.getThree);
postFormRouter.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
postFormRouter.delete('/posts/:id', checkAuth, PostController.remove);
postFormRouter.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);


export default postFormRouter;