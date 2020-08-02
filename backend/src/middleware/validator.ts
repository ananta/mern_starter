import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ResponseWrapper from '../utils/responseWrapper';

const registerSchema = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    fullName: Joi.string().max(100).required().label('Full Name'),
    password: Joi.string().min(6).max(128).required().label('Password'),
});

export function register(req: Request, res: Response, next: NextFunction): Response {
    const result = registerSchema.validate(req.body);
    if (result.hasOwnProperty('error')) {
        console.log({
            result,
        });
        if (result.error.details[0].context.label === 'password') {
            return res.status(400).json(ResponseWrapper(false, `Password must be minimum of 6 chracters`));
        }
        return res
            .status(400)
            .json(ResponseWrapper(false, `Please provide valid ${result.error.details[0].context.label}.`));
    }
    next();
}

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(6).max(128).required().label('Password'),
});

export function login(req: Request, res: Response, next: NextFunction): Response {
    const result = loginSchema.validate(req.body);
    if (result.hasOwnProperty('error')) {
        console.log({
            result,
        });
        if (result.error.details[0].context.label === 'password') {
            return res.status(400).json(ResponseWrapper(false, `Password must be minimum of 6 chracters`));
        }
        return res
            .status(400)
            .json(ResponseWrapper(false, `Please provide valid ${result.error.details[0].context.label}.`));
    }
    next();
}
