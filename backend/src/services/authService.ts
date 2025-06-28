import { pool } from "../config/db";
import logger from "../logger/logger";
import { HttpException } from "../utils/customError";
const validator = require("validator");
const bcrypt = require("bcrypt");

export const createUser = async (
  email: string,
  username: string,
  password: string
): Promise<void> => {
  const created = new Date();

  if (!email || !username || !password) {
    throw new HttpException(400, "Missing data");
  }

  if (typeof email !== "string" || !validator.isEmail(email)) {
    throw new HttpException(400, "Email is not valid");
  }

  if (password.length > 50 || password.length < 8) {
    throw new HttpException(400, "Password is not valid.");
  }

  if (typeof username !== "string" || username.length < 3) {
    throw new HttpException(400, "Username is not valid");
  }

  try {
    const hash: string = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (email, username, password_hash, created) VALUES ($1, $2, $3, $4)`,
      [email, username, hash, created]
    );
  } catch (error: any) {
    console.log(error);

    if (error.detail.includes("Key (username)") && error.detail.includes("already exists")) {
      throw new HttpException(409, "Username already exists");
    }
    if (error.detail.includes("Key (email)") && error.detail.includes("already exists")) {
      throw new HttpException(409, "Email already exists");
    }
    logger.error("Error creating user", { service: "auth-service", error: error.detail });
    throw new HttpException(500, "Something went wrong");
  }
};

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new HttpException(400, "Missing data");
  }

  const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

  if (res.rows.length === 0) {
    throw new HttpException(401, "User doesn't exist");
  }

  const match = await bcrypt.compare(password, res.rows[0].password_hash);
  if (!match) {
    throw new HttpException(401, "Wrong username or password");
  }

  return {
    userId: res.rows[0].user_id,
    email: res.rows[0].email,
    username: res.rows[0].username,
  };
};
