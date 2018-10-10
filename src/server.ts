import express from 'express';
import session from 'express-session';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { AuthController } from './controllers';
import { sequelize } from './database/database';
import { authMiddleWare } from './middlewares/auth.middleware';

dotenv.config();

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;
const db = sequelize; // initialize sequelize

//Initialize cors to allow for cross origin requests
app.use(cors({ origin: ['http://localhost:4200'], credentials: true }));

// Initilize cookie parser to allow us to access the cookies stored in the browser
app.use(cookieParser('this-is-a-secret-token'));

// Initialize express-session to allow us to track the logged-in user across sessions
app.use(
  session({
    name: 'memestream-session',
    secret: 'this-is-a-secret-token',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000, secure: false }
  })
);

//Initialize body-parse to parse incoming parmaeter request to req.body
app.use(bodyParser.json()); // parse application/json
app.use(
  // parse application/x-www-form-urlencoded
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/auth', AuthController);

app.get('/content', authMiddleWare, function(req, res) {
  res.send({ content: 'Content only visible if authed' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/ \n\n`);
});
