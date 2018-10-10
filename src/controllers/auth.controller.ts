import { CreatedAt } from 'sequelize-typescript';
import { User } from '../database/models/user.model';
import { sequelize } from '../database/database';
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const router: Router = Router();

router.get('/', (req, res) => {
  res.send(req.session);
});

router.post('/register', (req: Request, res: Response) => {
  sequelize
    .sync()
    .then(() => {
      //Generate Hash of Password
      return bcrypt.hash(req.body.password, saltRounds);
    })
    .then(hash => {
      // Attempt to create user
      return User.create({
        username: req.body.username,
        password: hash
      });
    })
    .then(user => {
      // save user data in session
      req.session.user = user.toJSON();
      res.status(200).send(user);
    })
    .catch(err => {
      // User already exists
      res.status(403).send('This username already exists');
    });
});

router.post('/login', (req: Request, res: Response) => {
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (!user) {
        throw new Error('Did not find user');
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then(validPass => {
          if (validPass) {
            req.session.user = user.toJSON();
            res.status(200).send(req.session);
          } else {
            throw new Error('Password did not match');
          }
        });
    })
    .catch(err => {
      res.status(401).send('User does not exist or Password did not match');
    });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).send(req.session);
  });
});

export const AuthController: Router = router;
