const { createLogger, transports, format } = require("winston");

const {
  NODE_ENV='development'
} = process.env;

// app logging (winston: see: https://github.com/winstonjs/winston/blob/master/examples/quick-start.js)

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "restaurant-app" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({
      filename: "quick-start-error.log",
      level: "error",
    }),
    new transports.File({ filename: "quick-start-combined.log" }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;