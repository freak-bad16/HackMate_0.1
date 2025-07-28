import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		requirements: [String],
		techStack: [String],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
		joinRequests: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "JoinRequest" },
		],
	},
	{ timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
