import { Request, Response } from "express";
import mongoose from "mongoose";
import Quiz from "../models/QuizModel";

export default async (req: Request, res: Response) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const data = await Quiz.findById(id)

        res.status(200).json({ data, success: true })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false })
    }


}