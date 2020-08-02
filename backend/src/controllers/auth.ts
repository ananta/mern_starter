import { Request, Response } from 'express';
import { AuthService } from '../services/Auth';
import ResponseWrapper from '../utils/responseWrapper';

const authService = new AuthService();

/**
 *
 * @param req
 * @param res
 */

export async function register(req: Request, res: Response): Promise<Response> {
    const { fullName, email, password } = req.body;
    try {
        const result = await authService.register({ fullName, email, password });
        return res.json(
            ResponseWrapper(true, {
                message: 'Sucessfully registered',
                data: result,
            }),
        );
    } catch (err) {
        return res.status(err.status || 500).json(ResponseWrapper(false, err.message));
    }
}

export async function login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
        const result = await authService.login({ email, password });
        return res.json(
            ResponseWrapper(true, {
                message: 'Sucessfully registered',
                data: result,
            }),
        );
    } catch (err) {
        return res.status(err.status || 500).json(ResponseWrapper(false, err.message));
    }
}
