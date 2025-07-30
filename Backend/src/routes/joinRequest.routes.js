import { Router } from "express";
import { sendJoinRequest } from "../controllers/joinRequest.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/:roomId/send-request").post(verifyJWT, sendJoinRequest);
router
	.route("/:roomId/give-response/:requestId ")
	.post(verifyJWT, sendJoinRequest);

export default router;
