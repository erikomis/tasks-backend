import { Router } from 'express';
import routerAuth from './auth';

const router = Router();

router.use('auth', routerAuth);

export default router;
