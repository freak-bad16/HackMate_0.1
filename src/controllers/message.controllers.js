import { Message } from "../models/messages.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// POST /messages
export const sendMessage = asyncHandler(async (req, res) => {
	const { reciver, content, type = "text" } = req.body;
	const sender = req.user?._id;

	if (!reciver || !content) {
		throw new ApiError(400, "Receiver and content are required");
	}

	const message = await Message.create({
		sender,
		reciver,
		content,
		type,
		seenBy: [sender], // mark as seen by sender immediately
	});

	const fullMessage = await message.populate(
		"sender reciver",
		"fullName avatar email"
	);

	res.status(201).json({
		success: true,
		message: "Message sent successfully",
		data: fullMessage,
	});
});

// GET /messages/:userId
export const getMessagesWithUser = asyncHandler(async (req, res) => {
	const currentUser = req.user._id;
	const otherUser = req.params.userId;

	if (!otherUser) {
		throw new ApiError(400, "User ID is required to fetch messages");
	}

	const messages = await Message.find({
		$or: [
			{ sender: currentUser, reciver: otherUser },
			{ sender: otherUser, reciver: currentUser },
		],
	})
		.sort({ createdAt: 1 })
		.populate("sender reciver", "fullName avatar email");

	res.status(200).json({
		success: true,
		count: messages.length,
		data: messages,
	});
});

// PATCH /messages/:id/seen
export const markAsSeen = asyncHandler(async (req, res) => {
	const messageId = req.params.id;
	const userId = req.user._id;

	const message = await Message.findById(messageId);
	if (!message) {
		throw new ApiError(404, "Message not found");
	}

	if (!message.seenBy.includes(userId)) {
		message.seenBy.push(userId);
		await message.save();
	}

	res.status(200).json({
		success: true,
		message: "Message marked as seen",
	});
});
