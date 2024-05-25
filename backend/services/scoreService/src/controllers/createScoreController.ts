import { Request, Response } from "express";
import { channel, replyQueue } from "../config/connectRabbitMQ";
import { v4 as uuidv4 } from 'uuid';
interface IQuiz {
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
    const quizId: string = req.params.id
    const answers: string[] = req.body.answers
    const correlationId = uuidv4()



    const consumer = await channel.consume(replyQueue, (msg) => {
        console.log('consume')
        let score = 0

        if (msg?.properties.correlationId == correlationId) {
            const resObj: IQuiz = JSON.parse(msg?.content.toString())
            resObj.questions.forEach((element, index) => {
                if (element.correctAnswer == answers[index]) {
                    score++
                } else {
                    score--
                }
            });

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

}