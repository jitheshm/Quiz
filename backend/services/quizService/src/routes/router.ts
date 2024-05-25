import { Router } from "express";
import authentication from "../middlewares/authentication";
import createQuizController from "../controllers/createQuizController";

const router = Router();

router.post('/api/quizzes',authentication,createQuizController)

export default router