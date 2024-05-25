import { Request, Response } from "express";
import { IRequest } from "../middlewares/authentication";
import Quiz from "../models/QuizModel";
import mongoose from "mongoose";

export default async (req: Request, res: Response) => {
    try {
        let userId = new mongoose.Types.ObjectId((req as IRequest).user.userId)
        let quizId = new mongoose.Types.ObjectId(req.params.id)
        const resObj = await Quiz.deleteOne({ _id: quizId, createdUser: userId })
        if (resObj.deletedCount > 0) {
            res.status(200).json({ message: 'Quiz deleted', success: true })
        } else {
            res.status(404).json({ message: 'Quiz not found', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false })
    }
}