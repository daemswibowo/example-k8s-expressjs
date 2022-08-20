import express, { Request, Response } from 'express';
import controller from './controller';
import amqp from 'amqplib/callback_api';

export default express
  .Router()
  .get('/send', function (_req: Request, res: Response) {
    try {
      amqp.connect(
        process.env.RABBITMQ_URL ?? '',
        function (error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function (error1, channel) {
            if (error1) {
              throw error1;
            }
            const queue = 'hello';
            const msg = 'Hello world';

            channel.assertQueue(queue, {
              durable: false,
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(' [x] Sent %s', msg);
            res.json({ message: 'sent' });
          });
        }
      );
    } catch (e) {
      res.json({ message: 'error', error: e });
    }
  })
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.byId);
