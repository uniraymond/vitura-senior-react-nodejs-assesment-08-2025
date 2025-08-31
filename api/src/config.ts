import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: Number(process.env.PORT || 5050),
    clientPort: Number(process.env.CLIENTPORT || 5051),
    defaultView: process.env.DEFAULT_VIEW || 'doctor',
    nodeEnv: process.env.NODE_ENV || 'development',
} as const;