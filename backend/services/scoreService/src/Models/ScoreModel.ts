import mongoose, { Types } from "mongoose";


export interface IScore {
    userId: Types.ObjectId
    quizId: Types.ObjectId
    score: number
}

interface scoreDoc extends IScore, mongoose.Document {
    dateOfParticipate: Date;
}

const ScoreSchema = new mongoose.Schema({
    userId: { type: Types.ObjectId, required: true },
    quizId: { type: Types.ObjectId, required: true },
    score: { type: Number, required: true },
    dateOfParticipate: { type: Date, required: true, default: Date.now },
});

const Score = mongoose.model<scoreDoc>('Score', ScoreSchema);
export default Score

