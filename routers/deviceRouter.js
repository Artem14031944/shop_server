import { Router } from "express";
import DeviceConttroller from "../controllers/deviceController.js"

const router = new Router();

router.post('/create', DeviceConttroller.create);
router.get('/get_devices', DeviceConttroller.getAll);
router.get('/:id', DeviceConttroller.getOne);

export default router;