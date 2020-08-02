import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';

import * as validatorMiddleware from './middleware/validator';
import * as authController from './controllers/auth';
import tokenAuthenticator from './middleware/tokenAuthenticator';
import UserRoutes from './routes/User';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));

(async () => {
    try {
        await mongoose.connect(config.MONGO_URL || config.DEFAULT_MONGO_URL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connection to MongoDB established.');
    } catch (err) {
        console.log('DB Connection Error: ' + err);
    }

    app.post('/register', validatorMiddleware.register, authController.register);
    app.post('/login', validatorMiddleware.login, authController.login);
    app.use('/user', tokenAuthenticator, UserRoutes);
    app.post('*', (req, res) => {
        res.status(404).json({
            error: true,
            message: 'Not found',
        });
    });

    const port = config.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}...`);
    });
})();

export default app;
