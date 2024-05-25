import { Router } from "express";
import authentication from "../middlewares/authentication";
import createScoreController from "../controllers/createScoreController";
const router = Router();

router.post('/api/scores/quiz/:id', authentication, createScoreController)
export default router