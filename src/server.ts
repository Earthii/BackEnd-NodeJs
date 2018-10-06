import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import { sequelize } from './database/database';

// Import WelcomeController from controllers entry point
import { WelcomeController } from './controllers';

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json()); // parse application/json
app.use(
  // parse application/x-www-form-urlencoded
  bodyParser.urlencoded({
    extended: true
  })
);

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

// sequelize
//   .sync()
//   .then(() =>
//     User.create({
//       username: 'eric',
//       birthday: new Date(1980, 6, 20)
//     })
//   )
//   .then(jane => {
//     console.log(jane);
//   });

app.use('/welcome', WelcomeController);

app
  .route('/api')
  .get((req, res) => {
    res.send({
      test: ['hello world']
    });
  })
  .post((req, res) => {
    res.send(req.body);
  });

// Serve the application at the given port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
