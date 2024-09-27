import express from 'express';
import { port } from './env-globals';

const app = express();

app.listen(port, () => {
  console.log(`Listening to https://localhost:${port}`);
});
