import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { ApiController } from './controllers';
import { sequelize } from './database/database';

dotenv.config();

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

const db = sequelize; // initialize sequelize

app.use(cors());

app.use(bodyParser.json()); // parse application/json
app.use(
  // parse application/x-www-form-urlencoded
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api', ApiController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/ \n\n`);
});
