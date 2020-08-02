import { Router } from 'express';
import * as UserController from '../controllers/user';

const router = Router();

router.route('/profile').get(UserController.getUserInfo);

export default router;
