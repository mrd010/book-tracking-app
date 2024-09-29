import express from 'express';
import { port } from './env-globals';
import configuredCors from './configs/cors.config';
import apiRouter from './routers/api-router';
import { authenticate } from './middlewares/authenticate';
import { configPassport } from './configs/passport.config';

const app = express();

// app configs
app.use(configuredCors); // config cors
app.use(express.json()); // config for json response
app.use(express.urlencoded({ extended: true })); // config for body object in req
configPassport();

// middlewares
app.use(authenticate);

// api
app.use('/api', apiRouter);

// start server
app.listen(port, () => {
  console.log(`Listening to https://localhost:${port}`);
});
