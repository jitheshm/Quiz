import { Request, Response } from "express";
import { channel, replyQueue } from "../config/connectRabbitMQ";
import { v4 as uuidv4 } from 'uuid';
import Score from "../Models/ScoreModel";
import { IRequest } from "../middlewares/authentication";
interface IQuiz {
    _id: string
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

export default async (req: Request, res: Response) => {
    try {
        const quizId: string = req.params.id
        const answers: string[] = req.body.answers
        const correlationId = uuidv4()



        const consumer = await channel.consume(replyQueue, (msg) => {
            console.log('consume')
            let score = 0

            if (msg?.properties.correlationId == correlationId) {
                const resObj: IQuiz = JSON.parse(msg?.content.toString())
                console.log(resObj.questions.length, answers.length);
                
                if (resObj.questions.length !== answers.length) {
                    res.status(400).json({ message: "Invalid answers" })
                    channel.cancel(consumer.consumerTag)
                    return
                }
                resObj.questions.forEach((element, index) => {
                    if (element.correctAnswer == answers[index]) {
                        score++
                    } else {
                        score--
                    }
                });
                let result = new Score({
                    userId: (req as IRequest).user.userId,
                    quizId: quizId,
                    score: score
                })
                result.save()
                const msgObj = {
                    email: (req as IRequest).user.email,
                    score: score,
                    quizName: resObj.name
                }
                channel.publish('notification', 'notification', Buffer.from(JSON.stringify(msgObj)));
                res.status(200).json({ score: score, success: true })
                channel.cancel(consumer.consumerTag)


            }
        },
            {
                noAck: true
            })

        channel.sendToQueue('q&a', Buffer.from(JSON.stringify({ quizId: quizId })), {
            correlationId: correlationId,
            replyTo: replyQueue
        });
    } catch (error) {
        console.log(error);

    }

}