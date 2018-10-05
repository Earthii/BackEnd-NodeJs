import express from 'express';
import * as bodyParser from 'body-parser';

// Import WelcomeController from controllers entry point
import { WelcomeController } from './controllers';

const app: express.Application = express();
const port: string | number = process.env.PORT || 8080;

app.use(bodyParser.json()); // parse application/json

app.use(
  // parse application/x-www-form-urlencoded
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/welcome', WelcomeController);

app.route('/api').get((req, res) => {
  res.send({
    test: ['hello world']
  });
});

app.route('/api').post((req, res) => {
  res.send(req.body);
});

// Serve the application at the given port
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
