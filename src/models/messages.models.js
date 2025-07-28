import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		reciver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: { type: String, required: true },
		type: {
			type: String,
			enum: ["text", "image", "file"],
			default: "text",
		},
		seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
