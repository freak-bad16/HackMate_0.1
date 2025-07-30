import { Router } from "express";
import {
	getCurrentUser,
	updateAcountDetails,
	updateAvatar,
	updateCoverImage,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/user-info").get(verifyJWT, getCurrentUser);

router.route("/update-user-details").put(verifyJWT, updateAcountDetails);

router.route("/avatar").patch(verifyJWT, updateAvatar);

router.route("/cover-image").patch(verifyJWT, updateCoverImage);

export default router;
