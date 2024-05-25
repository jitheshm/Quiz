import mongoose, { Types } from "mongoose";


export interface IQuiz {
    name: string;
    category: string;
    qCount: number;
    difficulty: string;
    questions: {
        question: string;
        options: string[];
        correctAnswer: string;
    }[]


}

interface quizDoc extends IQuiz, mongoose.Document {
    createdUser: Types.ObjectId;
    dateOfCreated: Date;
}

const QuizSchema = new mongoose.Schema({
    name: { type: String, require: true },
    category: { type: String, require: true },
    qCount: { type: Number, require: true },
    difficulty: { type: String, require: true },
    questions: [{
        question: { type: String, require: true },
        options: [{ type: String, require: true }],
        correctAnswer: { type: String, require: true }
    }],
    createdUser: { type: Types.ObjectId, require: true },
    dateOfCreated: { type: Date, required: true, default: Date.now },
});

const Quiz = mongoose.model<quizDoc>('Quiz', QuizSchema);
export default Quiz

