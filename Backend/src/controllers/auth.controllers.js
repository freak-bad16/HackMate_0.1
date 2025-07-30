import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new ApiError(404, "User not found");
		}

		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		console.error("Token generation error:", error);
		throw new ApiError(500, "Something went wrong while generating tokens");
	}
};

const option = {
	httpOnly: true,
	secure: true,
	sameSite: "Strict",
	maxAge: 24 * 60 * 60 * 1000,
};

export const registerUser = asyncHandler(async (req, res) => {
	const { userName, email, fullName, password } = req.body;

	if (!userName) throw new ApiError(400, "Username is required");
	if (!email) throw new ApiError(400, "Email is required");
	const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	if (!emailRegex.test(email)) throw new ApiError(400, "Invalid email format");
	if (!fullName) throw new ApiError(400, "Full name is required");
	if (!password) throw new ApiError(400, "Password is required");
	if (password.length < 6)
		throw new ApiError(400, "Password must be at least 6 characters");

	const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
	if (existingUser) throw new ApiError(409, "User already exists");

	const user = await User.create({ userName, email, fullName, password });
	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	if (!createdUser)
		throw new ApiError(500, "Something went wrong while creating the user");

	return res
		.status(201)
		.json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;

	if (!password || (!userName && !email)) {
		throw new ApiError(
			400,
			"Password and either username or email are required"
		);
	}

	const currentUser = await User.findOne({
		$or: [{ email }, { userName }],
	});

	if (!currentUser) {
		throw new ApiError(404, "User not found");
	}

	const isPasswordValid = await currentUser.isPasswordCorrect(password);
	if (!isPasswordValid) {
		throw new ApiError(401, "Incorrect username/email or password");
	}

	const { accessToken, refreshToken } =
		await generateAccessTokenAndRefreshToken(currentUser._id);

	const user = await User.findById(currentUser._id).select(
		"-password -refreshToken"
	);

	return res
		.status(200)
		.cookie("accessToken", accessToken, option)
		.cookie("refreshToken", refreshToken, option)
		.json(
			new ApiResponse(
				200,
				{ accessToken, refreshToken, user },
				"Login successful"
			)
		);
});

export const logoutUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(req.currentUser._id, {
		$set: { refreshToken: undefined },
	});

	return res
		.status(200)
		.clearCookie("accessToken", option)
		.clearCookie("refreshToken", option)
		.json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
	try {
		const incomingRefreshToken =
			req.cookies.refreshToken || req.body.refreshToken;

		if (!incomingRefreshToken) {
			throw new ApiError(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(
			incomingRefreshToken,
			process.env.REFRESH_TOKEN_SECRET
		);

		const user = await User.findById(decodedToken?._id);
		if (!user) throw new ApiError(401, "Invalid refresh token");

		if (incomingRefreshToken !== user?.refreshToken) {
			throw new ApiError(401, "Refresh token expired or invalid");
		}

		const { accessToken, refreshToken } =
			await generateAccessTokenAndRefreshToken(user._id);

		return res
			.status(200)
			.cookie("accessToken", accessToken, option)
			.cookie("refreshToken", refreshToken, option)
			.json(
				new ApiResponse(
					200,
					{ accessToken, refreshToken },
					"New tokens issued successfully"
				)
			);
	} catch (error) {
		throw new ApiError(401, "Could not refresh access token");
	}
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if (!newPassword) throw new ApiError(400, "New password is required");
	if (newPassword.length < 6)
		throw new ApiError(400, "Password must be at least 6 characters");

	const user = await User.findById(req.currentUser?._id);
	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

	if (!isPasswordCorrect) {
		throw new ApiError(401, "Incorrect current password");
	}

	user.password = newPassword;
	await user.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Password changed successfully"));
});
