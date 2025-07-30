import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		fullName: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		coverImage: {
			type: String,
		},
		about: {
			type: String,
			default: "Hyy, everyone I'm new here!",
		},
		socialLink: {
			linkedIn: { type: String, default: "" },
			github: { type: String, default: "" },
			insta: { type: String, default: "" },
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return;

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	try {
		const token = jwt.sign(
			{
				_id: this._id,
				username: this.username,
				fullName: this.fullName,
				email: this.email,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
			}
		);
		return token;
	} catch (error) {
		throw new ApiError(404, "something went wrong while generateAccessToken");
	}
};

userSchema.methods.generateRefreshToken = function () {
	try {
		const token = jwt.sign(
			{
				_id: this._id,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
			}
		);
		return token;
	} catch (error) {
		throw new ApiError(404, "something went wrong while generateRefreshToken");
	}
};

export const User = mongoose.model("User", userSchema);
