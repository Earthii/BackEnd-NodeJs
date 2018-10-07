import { Router, Request, Response } from 'express';

import { sequelize } from './../database/database';

import { Message } from './../database/schema/message';

const router: Router = Router();

router.get('/message', (req: Request, res: Response) => {
  Message.findAll().then(messages => {
    res.send(messages);
  })
});

router.post('/message', (req: Request, res: Response) => {
  sequelize
    .sync()
    .then(() => {
      return Message.create({
        message: req.body.message,
        date: new Date()
      });
    })
    .then(message => {
      res.send(req.body);
    });
});

export const ApiController: Router = router;
