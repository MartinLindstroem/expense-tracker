import express, { Express, Request, Response, NextFunction } from "express";
import "./config/env";
import cors from "cors";
import v1Router from "./v1/routes";
import expenseRouter from "./v1/routes/expenseRoutes";
import categoryRouter from "./v1/routes/categoryRoutes";
import authRouter from "./v1/routes/authRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import { HttpException } from "./utils/customError";
import cookieParser from "cookie-parser";
import logger from "./logger/logger";

console.log("CLIENT_URL", process.env.CLIENT_URL);

const app: Express = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", v1Router);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/auth", authRouter);

// Middleware to wrap unhandled errors in HttpException
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (!(error instanceof HttpException)) {
    error = new HttpException(500, error.message || "Internal Server Error");
  }
  next(error);
});
app.use(errorMiddleware);

export default app;
