import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/customError";
import logger from "../logger/logger";

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  // logger.error({
  //   service: "app-service",
  //   status,
  //   message,
  //   details: error.message,
  // });

  // console.log(status, message);

  res.status(status).json({
    status,
    message,
  });
}

export default errorMiddleware;
