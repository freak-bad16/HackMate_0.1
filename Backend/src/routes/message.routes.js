import express from "express";
import {
	sendMessage,
	getMessagesWithUser,
	markAsSeen,
} from "../controllers/message.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", sendMessage);
router.get("/:userId", getMessagesWithUser);
router.patch("/:id/seen", markAsSeen);

export default router;
