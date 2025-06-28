import winston from "winston";
const { combine, timestamp, printf, colorize } = winston.format;
import path from "path";

const logDir = path.join(__dirname, "../../logs");

const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

const fileFormat = combine(
  timestamp(),
  printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...meta,
    });
  })
);

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        ...meta,
      });
    })
  ),
  //   defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: `${logDir}/error.log`,
      level: "error",
      format: fileFormat,
    }),
    new winston.transports.File({ filename: `${logDir}/combined.log`, format: fileFormat }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

export default logger;
