import { Request, Response } from "express";
import Quiz, { IQuiz } from "../models/QuizModel";
import { IRequest } from "../middlewares/authentication";

export default async (req: Request, res: Response) => {
    try {
        const data: IQuiz = req.body
        const quiz = new Quiz({
            ...data,
            createdUser: (req as IRequest).user.userId
        })
        await quiz.save()
        res.status(200).json({ message: 'Quiz created', success: true })



    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false })
    }
}