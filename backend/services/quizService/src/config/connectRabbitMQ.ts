
import amqp from 'amqplib'

import qa_consumer from '../consumers/qa_consumer';
const connectString = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672';

export let channel: amqp.Channel;
export let replyQueue: string;
export default async () => {
    let connection: amqp.Connection | null = null;
    let retry = 0;
    while (retry < 10) {
        try {

            connection = await amqp.connect(connectString);
            channel = await connection.createChannel()

            let q = await channel.assertQueue('', { exclusive: true })
            channel.prefetch(1);
            replyQueue = q.queue;
            qa_consumer()
            console.log(">>>>>>>>>>>>>>>>>>>>>RabbitMQ connected");
            break;

        } catch (error) {
            console.log(error);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>RabbitMQ connection failed");
            await new Promise(resolve => setTimeout(resolve, 5000));
            retry++;
            console.log(`Retry(${retry}) to connect to RabbitMQ`);

        }
    }
}