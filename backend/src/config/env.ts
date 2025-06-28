import dotenv from "dotenv";

let envFile;
process.env.NODE_ENV === "development"
  ? (envFile = ".env.development")
  : (envFile = ".env.production");
dotenv.config({ path: envFile });
