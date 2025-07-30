import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(
			new ApiResponse(200, req.currentUser, "Current user fetched successfully")
		);
});

export const updateAcountDetails = asyncHandler(async (req, res) => {
	const { fullName, about, socialLink } = req.body;
	const { linkedIn, github, insta } = socialLink || {};

	const user = await User.findByIdAndUpdate(
		req.currentUser?._id,
		{
			$set: {
				fullName,
				about: about || "Hey everyone, I'm new here!",
				"socialLink.linkedIn": linkedIn || "",
				"socialLink.github": github || "",
				"socialLink.insta": insta || "",
			},
		},
		{ new: true }
	).select("-password");

	return res
		.status(200)
		.json(new ApiResponse(200, user, "Account details updated successfully"));
});

export const updateAvatar = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Avatar updated successfully"));
});

export const updateCoverImage = asyncHandler(async (req, res) => {
	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Cover image updated successfully"));
});
