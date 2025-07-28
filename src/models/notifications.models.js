import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		reciver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		}, // user who gets this
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who triggered the notification
		catogery: {
			type: String,
			enum: ["join_request", "message", "room_update", "comment"],
			required: true,
		},
		room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
		message: { type: String },
		isRead: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
