import mongoose from "mongoose";

const joinRequestSchema = new mongoose.Schema(
	{
		room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
		requester: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		},
		message: {
			type: String,
			require: true
		},
	},
	{ timestamps: true }
);

export const JoinRequest = mongoose.model("JoinRequest", joinRequestSchema);
