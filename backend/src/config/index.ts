import * as dotenv from 'dotenv';
dotenv.config();
export default {
    NODE_ENV: process.env.NODE_ENV,
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    REDIS_PORT: process.env.REDIS_PORT,
    DEFAULT_MONGO_URL: 'mongodb://localhost:27017/mern_starter_typescript',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
