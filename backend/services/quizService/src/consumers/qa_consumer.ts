import { channel } from "../config/connectRabbitMQ";
import { fetchQuiz } from "../services/quizServices";
import amqp from 'amqplib'
export default async () => {
    let q = await channel.assertQueue('q&a', { durable: false })

    channel.consume('q&a', async (msg) => {

        let quizId = JSON.parse(msg?.content.toString() as string).quizId
        const quiz = await fetchQuiz(quizId)


        channel.sendToQueue(msg?.properties.replyTo, Buffer.from(JSON.stringify(quiz)), {
            correlationId: msg?.properties.correlationId
        });


        channel.ack(msg as amqp.Message);

    }, {
        noAck: false
    })
}