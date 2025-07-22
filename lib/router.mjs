import { HelloController } from './controllers/HelloController.mjs';
import express from 'express';

router.get('/hello', HelloController.test);

export const router = express.Router();
