import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		console.log("Token received:", token); // Debug log

		if (!token || typeof token !== "string" || !token.trim()) {
			throw new ApiError(401, "unauthorized request");
		}

		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const currentUser = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);

		if (!currentUser) {
			throw new ApiError(401, "invalid access token");
		}

		req.currentUser = currentUser;
		next();
	} catch (error) {
		throw new ApiError(401, error?.message || "auth problem");
	}
});
