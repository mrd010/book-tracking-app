import dotEnv from 'dotenv';

// env config
dotEnv.config();

// vars
export const port = process.env.PORT || 3000;
export const clientURL = process.env.CLIENT_URL;
export const jwtSecret = process.env.JWT_SECRET;
