import winston from "winston";
import configuration from "./configuration";

/**
 * Create a logger instance using the Winston library.
 * This logger will output logs to the console unless in test environment.
 */
const logger = winston.createLogger({
	// Disable logging in test environment
	silent: configuration.NODE_ENV === "test",

	/**
	 * Define the transports for the logger.
	 * Here, we are using the Console transport to log messages to the console.
	 */
	transports: [new winston.transports.Console()],

	/**
	 * Define the format of the log messages.
	 * We combine timestamp and custom printf formatting.
	 */
	format: winston.format.combine(
		/**
		 * Add a timestamp to each log message.
		 */
		winston.format.timestamp(),

		/**
		 * Define a custom format for log messages.
		 * This format includes the timestamp, log level, and the message itself.
		 */
		winston.format.printf(
			({ timestamp, level, message }) => {
				return `${timestamp} [${level}] ${message}`;
			},
		),
	),
});

/**
 * Export the logger instance for use throughout the application.
 */
export default logger;
