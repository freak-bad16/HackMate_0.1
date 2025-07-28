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
router.put("/:id", verifyJWT, updateRoom);
router.post("/:id/like", verifyJWT, likeRoom);
router.get("/all-rooms", verifyJWT, getAllRoom);
router.get("/all-rooms-of-User", verifyJWT, getAllRoomOfUser);
router.post("/:id/comment", verifyJWT, doComment);
router.delete("/:id", verifyJWT, deleteRoom);

export default router;
