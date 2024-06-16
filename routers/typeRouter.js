import { Router } from "express";
import TypeController from '../controllers/typeController.js';
import AuthMiddleware from '../middleware/AuthMiddleware.js';

const router = new Router();

router.get('/get_types', TypeController.getAll);
router.post('/create', AuthMiddleware('ADMIN'), TypeController.create);

export default router;