import { Router } from "express";
import {
	createRoom,
	updateRoom,
	deleteRoom,
	likeRoom,
	getAllRoom,
	getAllRoomOfUser,
	doComment,
} from "../controllers/room.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/create-room").post(verifyJWT, createRoom);
router.put("/:roomId", verifyJWT, updateRoom);
router.post("/:roomId/like", verifyJWT, likeRoom);
router.get("/all-rooms", verifyJWT, getAllRoom);
router.get("/all-rooms-of-User", verifyJWT, getAllRoomOfUser);
router.post("/:roomId/comment", verifyJWT, doComment);
router.delete("/:roomId", verifyJWT, deleteRoom);

export default router;
