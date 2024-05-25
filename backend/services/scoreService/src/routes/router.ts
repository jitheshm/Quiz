import { Router } from "express";
const router = Router();

router.get('/api/score', (req, res) => {
    res.send('Score Service is up and running')
})
export default router