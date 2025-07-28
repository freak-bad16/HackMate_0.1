import mongoose from "mongoose";
import { Room } from "../models/rooms.models.js";
import { JoinRequest } from "../models/joinRequest.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendJoinRequest = asyncHandler(async (req, res) => {
    const roomId = req.params.id;

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
