import { User } from '../database/models/user.model';
import { sequelize } from '../database/database';
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const router: Router = Router();

router.get('/', (req, res)=>{
  res.send({ping:true})
})

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
      res.status(403).send("This username already exists");
    });
});

router.post('/login', (req: Request, res: Response) => {
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      return user as { username: string; password: string };
    })
    .then(user => {
      if(!user){
        throw new Error("Did not find user");
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(validPass => {
        if(validPass){
          res.status(200).send();
        }else{
          throw new Error("Password did not match");
        }
    }).catch(err =>{
      res.status(401).send("User does not exist or Password did not match");
    });
});

export const AuthController: Router = router;
