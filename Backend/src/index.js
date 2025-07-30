import dotenv from "dotenv";
import { app } from "./app.js";
import connectDb from "./db/index.db.js";

dotenv.config();

const port = process.env.PORT || 8000;

connectDb()
	.then(() => {
		app.listen(port, () => {
			console.log(`🚀 App is running at http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("❌ DB connection failed {index.js} error:", error);
	});
