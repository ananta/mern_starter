import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

import ResponseWrapper from '../utils/responseWrapper';
import { UserProps, AuthenticatedRequest } from '../common/types';

// TODO: Refresh token
const tokenAuthenticator = (req: AuthenticatedRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.status(401).json(ResponseWrapper(false, 'Please provide access token!'));
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err: Error, user: UserProps) => {
        if (err) return res.status(403).json(ResponseWrapper(false, 'Invalid token! Please login again!'));
        req.user = user;
        next();
    });
};

export default tokenAuthenticator;
