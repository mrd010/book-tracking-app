import dotEnv from 'dotenv';

// env config
dotEnv.config();

// vars
export const port = process.env.PORT;
