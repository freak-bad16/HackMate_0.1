import { Router } from "express";
import {
	createRoom,
	updateRoom,
	deleteRoom,
} from "../controllers/room.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/create-room").post(verifyJWT, createRoom);
router.put("/:id", verifyJWT, updateRoom);
router.delete("/:id", verifyJWT, deleteRoom);

export default router;
