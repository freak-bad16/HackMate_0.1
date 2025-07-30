import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
