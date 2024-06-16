import { Router } from "express";
import BrandConttroller from "../controllers/brandController.js"

const router = new Router();

router.get('/get_brands', BrandConttroller.getAll);
router.post('/create', BrandConttroller.create);

export default router;