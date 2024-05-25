import { Router } from "express";
import authentication from "../middlewares/authentication";
import createQuizController from "../controllers/createQuizController";
import deleteQuizController from "../controllers/deleteQuizController";
import getQuizController from "../controllers/getQuizController";
import updateQuizController from "../controllers/updateQuizController";

const router = Router();

router.post('/api/quizzes', authentication, createQuizController)
router.get('/api/quizzes/edit/:id', authentication, getQuizController)
router.get('/api/quizzes/:id', authentication, getQuizController)
router.patch('/api/quizzes/:id', authentication, updateQuizController)
router.delete('/api/quizzes/:id', authentication, deleteQuizController)

export default router