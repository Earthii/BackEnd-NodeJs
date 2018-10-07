import { User } from './../database/schema/user';
import { sequelize } from './../database/database';
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const router: Router = Router();

router.post('/register', (req: Request, res: Response) => {
  sequelize
    .sync()
    .then(() => {
      return bcrypt.hash(req.body.password, saltRounds);
    })
    .then(hash => {
      return User.create({
        username: req.body.username,
        password: hash
      });
    })
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post('/login', (req: Request, res: Response) => {
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      return user as { username: string; password: string };
    })
    .then(user => {
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(validPass => {
        // true - password match
        // flase - password doesnt match
      res.send(validPass);
    });
});

export const AuthController: Router = router;
