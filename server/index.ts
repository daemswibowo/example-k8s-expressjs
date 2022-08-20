import './common/env';
import Server from './common/server';
import routes from './routes';
import amqp from 'amqplib/callback_api';

// receiving
amqp.connect(process.env.RABBITMQ_URL ?? '', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = 'hello';

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(
      queue,
      function (msg) {
        if (!msg) return;
        console.log(' [x] Received %s', msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});

const port = parseInt(process.env.PORT ?? '3000');
export default new Server().router(routes).listen(port);
