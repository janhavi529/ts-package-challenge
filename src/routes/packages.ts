import { Router } from 'express';

import packagesHandlers from '../handlers/packages';

const router = Router();

/**
* To handle GET package details.
*/
// TODO: Further enhancements - Upload file functionality 
router.get('/packages/:fileName', packagesHandlers.getPackages);

/**
* To check the health status (dummy).
*/
router.get('/health', (req, res, next) => {
    res.status(200).send('Healthy...');
});

/**
* To handle default request.
*/
router.get('/', (req, res, next) => {
    res.status(200).send('Call GET /packages to get package details.');
});

export default router;
