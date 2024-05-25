import { Router } from "express";

const router = Router();
router.get('/api/quizzes', () => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>Hello')
})
export default router