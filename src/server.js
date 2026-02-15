import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import { errors } from "celebrate";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.use(helmet());
app.use(cookieParser());
app.use(logger);
app.use(userRoutes);
app.use(authRoutes);
app.use(notesRoutes);
app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
