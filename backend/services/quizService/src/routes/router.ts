import { Router } from "express";
import authentication from "../middlewares/authentication";
import createQuizController from "../controllers/createQuizController";
import deleteQuizController from "../controllers/deleteQuizController";

const router = Router();

router.post('/api/quizzes',authentication,createQuizController)
router.delete('/api/quizzes/:id',authentication,deleteQuizController)

export default router