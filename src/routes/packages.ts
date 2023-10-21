import { Router } from 'express';

import packagesHandlers from '../handlers/packages';

const router = Router();

// TODO: Upload file using Multer package
router.get('/packages', packagesHandlers.getPackages);

export default router;
