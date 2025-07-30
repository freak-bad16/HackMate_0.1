import mongoose from "mongoose";
import { Room } from "../models/rooms.models.js";
import { JoinRequest } from "../models/joinRequest.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendJoinRequest = asyncHandler(async (req, res) => {
	const roomId = req.params.roomId;

	if (!mongoose.Types.ObjectId.isValid(roomId)) {
		throw new ApiError(400, "Invalid room ID");
	}

	const userId = req.currentUser._id;
	const { message } = req.body;

	if (!message?.trim()) {
		throw new ApiError(400, "Comment is required");
	}

	const joinRequest = await JoinRequest.create({
		room: roomId,
		requester: userId,
		message,
	});

	const room = await Room.findById(roomId);
	if (!room) {
		throw new ApiError(404, "Room not found");
	}

	room.joinRequests = room.joinRequests || [];
	room.joinRequests.push(joinRequest._id);
	await room.save();

	return res
		.status(200)
		.json(new ApiResponse(200, joinRequest, "Join request submitted"));
});

export const responseToJoinRequest = asyncHandler(async (req, res) => {
	const { roomId, requestId } = req.params;
	const userId = req.currentUser._id;
	const { action } = req.body;

	const room = await Room.findById(roomId);
	if (!room) {
		throw new ApiError(404, "Invalid room ID");
	}

	if (!userId || room.createdBy.toString() !== userId.toString()) {
		throw new ApiError(403, "Request by unauthorized person");
	}

	const joinRequest = await JoinRequest.findById(requestId);
	if (!joinRequest) {
		throw new ApiError(404, "Invalid join request");
	}

	if (joinRequest.room.toString() !== roomId) {
		throw new ApiError(400, "Join request doesn't belong to this room");
	}

	if (!["accept", "reject"].includes(action)) {
		throw new ApiError(400, "Action must be 'accept' or 'reject'");
	}

	if (action === "accept") {
		if (!room.members.includes(joinRequest.requester)) {
			room.members.push(joinRequest.requester);
		}
		joinRequest.status = "accepted";
	} else {
		joinRequest.status = "rejected";
	}

	room.joinRequests = room.joinRequests.filter(
		(id) => id.toString() !== requestId
	);

	await joinRequest.save();
	await room.save();

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				joinRequest,
				`Join request ${action === "accept" ? "accepted" : "rejected"} successfully`
			)
		);
});
