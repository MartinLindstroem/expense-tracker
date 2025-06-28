import { Request, Response, NextFunction } from "express";
import { createUser, login } from "../services/authService";
import logger from "../logger/logger";
const jwt = require("jsonwebtoken");

const generateAccessToken = (user: any) => {
  return jwt.sign(
    { userId: user.userId, email: user.email, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { userId: user.userId, email: user.email, username: user.username },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUser(req.body.email, req.body.username, req.body.password);
    res.status(200).json("User successfully created");
    logger.info("User successfully created", { service: "auth-service" });
  } catch (error: any) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await login(req.body.email, req.body.password);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ msg: "Success", user });
    logger.info("Successfull login attempt", { service: "auth-service", ip: req.ip });
  } catch (error: any) {
    logger.warn("Unsuccessful login attempt", {
      service: "auth-service",
      ip: req.ip,
    });
    next(error);
  }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ msg: "Logged out" });
    logger.info("Successfull logout attempt", { service: "auth-service" });
  } catch (error: any) {
    logger.warn("Unsuccessful logout attempt", { service: "auth-service", error: error.message });
    next(error);
  }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    logger.warn("No refresh token provided", { service: "auth-service" });
    return res.status(401).json({ msg: "No refresh token provided" });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
    const newAccessToken = generateAccessToken(user);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({ accessToken: newAccessToken });
    logger.info("Access token refreshed", { service: "auth-service" });
  } catch (error: any) {
    logger.warn("Invalid refresh token", { service: "auth-service", error: error.message });
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};
