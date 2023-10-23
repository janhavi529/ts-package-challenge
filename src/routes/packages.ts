import { Request, Response, Router } from 'express';

import packagesHandlers from '../handlers/packages';

const router = Router();

/**
 * Method: GET
 * Path: /packages/:fileName
 * Description: Get optimal packages result with items contributing to maximum cost.
 */
router.get('/packages/:fileName', packagesHandlers.getPackages);

/**
 * Method: GET
 * Path: /health
 * Description: Check the health status (dummy).
 */
router.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Healthy...');
});

/**
 * Method: GET
 * Path: /
 * Description: To handle default request.
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).send('Call GET /packages/:fileName to get package details.');
});

export default router;
