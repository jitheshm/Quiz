
import amqp from 'amqplib'
import authService from '../services/authService';
import authConsumer from '../consumers/authConsumer';
const connectString = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672';

export let channel: amqp.Channel;
export default async () => {
    let connection: amqp.Connection | null = null;
    let retry = 0;
    while (retry < 10) {
        try {

            connection = await amqp.connect(connectString);
            channel = await connection.createChannel()
           
            channel.prefetch(1);

            authConsumer()

            console.log("RabbitMQ connected");
            break;


        } catch (error) {
            console.log(error);
            console.log("RabbitMQ connection failed")
            await new Promise(resolve => setTimeout(resolve, 5000));
            retry++;
            console.log(`Retry(${retry}) to connect to RabbitMQ`);

        }
    }
}