import { Room } from "../models/rooms.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const createRoom = asyncHandler(async (req, res) => {
	const { title, description, requirements, techStack } = req.body;

	if (!title) {
		throw new ApiError(400, "Title is required to create room");
	}
	if (!description) {
		throw new ApiError(400, "Description is required to create room");
	}

	const room = await Room.create({
		title,
		description,
		requirements: Array.isArray(requirements) ? requirements : [],
		techStack: Array.isArray(techStack) ? techStack : [],
		createdBy: req.currentUser._id,
	});

	if (!room) {
		throw new ApiError(500, "Failed to create room");
	}

	return res
		.status(201)
		.json(new ApiResponse(201, room, "Room created successfully"));
});

export const updateRoom = asyncHandler(async (req, res) => {
	const roomId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(roomId)) {
		throw new ApiError(400, "Invalid room ID");
	}

	const { title, description, requirements, techStack } = req.body;

	if (!title?.trim()) {
		throw new ApiError(400, "Title is required");
	}

	if (!description?.trim()) {
		throw new ApiError(400, "Description is required");
	}

	const room = await Room.findByIdAndUpdate(
		roomId,
		{
			title,
			description,
			requirements: Array.isArray(requirements) ? requirements : [],
			techStack: Array.isArray(techStack) ? techStack : [],
		},
		{ new: true }
	);

	if (!room) {
		throw new ApiError(404, "Room not found or update failed");
	}

	return res
		.status(200)
		.json(new ApiResponse(200, room, "Room updated successfully"));
});

export const likeRoom = asyncHandler(async (req, res) => {
    
});

export const deleteRoom = asyncHandler(async (req, res) => {
	const roomId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(roomId)) {
		throw new ApiError(400, "Invalid room ID");
	}

	const room = await Room.findById(roomId);
	if (!room) {
		throw new ApiError(404, "Room not found");
	}

	if (room.createdBy.toString() !== req.currentUser._id.toString()) {
		throw new ApiError(403, "You are not authorized to delete this room");
	}

	await Room.findByIdAndDelete(roomId);

	return res
		.status(200)
		.json(new ApiResponse(200, {}, "Room deleted successfully"));
});
