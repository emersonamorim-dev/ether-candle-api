import { config } from 'dotenv'
import { Channel, connect } from 'amqplib'

export const createMessageChannel = async (): Promise<Channel> => {
    config()

    try {
        const connection = await connect(process.env.AMQP_SERVER)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME)
        console.log('Conectando RabbitMQ')

        return channel
    } catch (err) {
        console.log('Erro ao tentar conectar RabbitMQ')
        console.log(err)
        return null
    }
}