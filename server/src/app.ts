import express from 'express';
import { port } from './env-globals';
import configuredCors from './configs/cors';
import apiRouter from './routers/api-router';

const app = express();

// app configs
app.use(configuredCors); // config cors
app.use(express.json()); // config for json response
app.use(express.urlencoded({ extended: true })); // config for body object in req

// api
app.use('/api', apiRouter);

// start server
app.listen(port, () => {
  console.log(`Listening to https://localhost:${port}`);
});
