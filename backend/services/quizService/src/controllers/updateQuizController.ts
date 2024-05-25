import { Request, Response } from "express";
import Quiz from "../models/QuizModel";
import mongoose from "mongoose";
import { IRequest } from "../middlewares/authentication";

export default async (req: Request, res: Response) => {
    try {
        let data = req.body
        let id = new mongoose.Types.ObjectId(req.params.id)
        let userId = new mongoose.Types.ObjectId((req as IRequest).user.userId)
        let resObj = await Quiz.updateOne({ _id: id, createdUser: userId }, data)
        if (resObj.modifiedCount > 0) {
            res.status(200).json({ message: 'Quiz updated', success: true })
        } else {
            res.status(404).json({ message: 'Quiz not found', success: false })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false })
    }
}