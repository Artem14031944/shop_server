import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import userController from "../controllers/userController.js";

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', AuthMiddleware, userController.check);

export default router;