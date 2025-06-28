import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/customError";
import logger from "../logger/logger";
const jwt = require("jsonwebtoken");

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      logger.info("No access token provided", { service: "auth-service" });
      throw new HttpException(401, "You must log in to access this page", "auth-middleware");
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string);

    req.body.user = decoded;
    next();
  } catch (error: any) {
    logger.info("Invalid or expired token", { service: "auth-service", error: error.message });
    next(new HttpException(401, "Invalid or expired token", "auth-middleware"));
  }
}

export default authMiddleware;
