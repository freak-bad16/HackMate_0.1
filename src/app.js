import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import roomRoutes from "./routes/room.routes.js";
import requestRoutes from "./routes/joinRequest.routes.js";
import messageRoutes from "./routes/message.routes.js";


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/request", requestRoutes);
app.use("/api/v1/messages", messageRoutes);

// http://localhost:8000/api/v1/auth/register

export { app };
