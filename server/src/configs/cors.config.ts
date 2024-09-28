import cors from 'cors';
import { clientURL } from '../env-globals';

const corsOptions = {
  origin: clientURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you need
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

const configuredCors = cors(corsOptions);
export default configuredCors;
