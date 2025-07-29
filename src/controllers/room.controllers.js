import { Room } from "../models/rooms.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comments.models.js";
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
    const roomId = req.params.roomId;

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
    const roomId = req.params.roomId;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        throw new ApiError(400, "Invalid room ID");
    }

    const room = await Room.findById(roomId);
    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    if (room.likes.includes(req.currentUser._id)) {
        throw new ApiError(409, "You have already liked this room");
    }

    room.likes.push(req.currentUser._id);
    await room.save();

    return res.status(200).json(
        new ApiResponse(200, room, "Room has been liked successfully")
    );
});

export const getAllRoom = asyncHandler(async (req, res) => {
    const allRooms = await Room.find({});
    return res
        .status(200)
        .json(new ApiResponse(200, allRooms, "Fetched all rooms"));
});

export const getAllRoomOfUser = asyncHandler(async (req, res) => {
    const id = req.currentUser._id;

    if (!id) {
        throw new ApiError(400, "Invalid user ID");
    }

    const userRooms = await Room.find({ createdBy: id });
    return res
        .status(200)
        .json(new ApiResponse(200, userRooms, "Fetched user's rooms"));
});

export const doComment = asyncHandler(async (req, res) => {
    const roomId = req.params.roomId;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        throw new ApiError(400, "Invalid room ID");
    }

    const userId = req.currentUser._id;

    const { content } = req.body;

    if (!content?.trim()) {
        throw new ApiError(400, "comment is required");
    }

    const comment = await Comment.create(
        {
            room: roomId,
            user: userId,
            content,
        }
    )

    const room = await Room.findById(roomId);
    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    room.comments.push(comment._id);
    await room.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                comment,
                "comment is done"
            )
        )
})

export const deleteRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.roomId;

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
