import { HelloController } from './controllers/HelloController.mjs';
import { MapDataController } from './controllers/MapDataController.mjs';
import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/hello', HelloController.test);
apiRouter.post('/map-data', MapDataController.getMapData);

export default apiRouter
