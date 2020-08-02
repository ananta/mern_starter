import { Response } from 'express';

import { AuthenticatedRequest } from '../common/types';
import ResponseWrapper from '../utils/responseWrapper';

/**
 *
 * @param req
 * @param res
 */

export async function getUserInfo(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
        return res.json(
            ResponseWrapper(true, {
                message: 'User details',
                data: req.user,
            }),
        );
    } catch (err) {
        return res.status(err.status || 500).json(ResponseWrapper(false, err.message));
    }
}
