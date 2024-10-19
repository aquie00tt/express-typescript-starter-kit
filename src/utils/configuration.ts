import { config } from "dotenv";

/**
 * Load environment variables from the appropriate .env file based on NODE_ENV.
 * This allows for different configurations depending on the environment.
 */
config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * Check if the PORT environment variable is defined.
 * If not, throw an error with a descriptive message.
 */
if (!process.env.PORT) {
	throw new Error(
		"PORT is not defined. Please add a PORT value in your .env file.",
	);
}

/**
 * Convert the PORT environment variable to a number.
 */
const port = Number(process.env.PORT);

/**
 * Validate the PORT value to ensure it is a valid number
 * within the acceptable range (0-65535).
 */
if (isNaN(port) || port < 0 || port > 65535) {
	throw new Error(
		"Invalid PORT value. PORT must be a number between 0 and 65535.",
	);
}

/**
 * Check if the ALLOW_LIST environment variable is defined.
 * If not, throw an error indicating it is missing.
 */
if (!process.env.ALLOW_LIST) {
	throw new Error(
		"ALLOW_LIST is not defined. Please add an ALLOW_LIST value in your .env file.",
	);
}

/**
 * Split the ALLOW_LIST string into an array for easier handling.
 * This is useful for specifying multiple allowed origins for CORS.
 */
const allowArray = process.env.ALLOW_LIST.split(",");

/**
 * Check if the API_VERSION environment variable is defined.
 * If not, throw an error indicating it is missing.
 */
if (!process.env.API_VERSION) {
	throw new Error(
		"API_VERSION is not defined. Please add an API_VERSION value in your .env file.",
	);
}

/**
 * Convert the API_VERSION environment variable to a number.
 */
const apiVersion = Number(process.env.API_VERSION);

/**
 * Validate the API_VERSION value to ensure it is a valid number.
 */
if (isNaN(apiVersion)) {
	throw new Error(
		"Invalid API_VERSION value. API_VERSION must be a number.",
	);
}

/**
 * Check if the MONGO_CONNECTION_URI environment variable is defined.
 * If not, throw an error indicating it is missing.
 */
if (!process.env.MONGO_CONNECTION_URI) {
	throw new Error(
		"MONGO_CONNECTION_URI is not defined. Please add an MONGO_CONNECTION_URI value in your .env file.",
	);
}

/**
 * Check if the MONGO_DATABASE_NAME environment variable is defined.
 * If not, throw an error indicating it is missing.
 */
if (!process.env.MONGO_DATABASE_NAME) {
	throw new Error(
		"MONGO_DATABASE_NAME is not defined. Please add an MONGO_DATABASE_NAME value in your .env file.",
	);
}

/**
 * Check if the SALT_ROUNDS environment variable is defined.
 * If not, throw an error indicating it is missing.
 */
if (!process.env.SALT_ROUNDS) {
	throw new Error(
		"SALT_ROUNDS is not defined. Please add a SALT_ROUNDS value in your .env file.",
	);
}

/**
 * Convert the SALT_ROUNDS environment variable to a number.
 */
const saltRounds = Number(process.env.SALT_ROUNDS);

/**
 * Validate the SALT_ROUNDS value to ensure it is a valid number.
 */
if (isNaN(saltRounds)) {
	throw new Error(
		"Invalid SALT_ROUNDS value. SALT_ROUNDS must be a number.",
	);
}

/**
 * Set up the configuration object to hold the application's environment settings.
 * This object centralizes the configuration values for easy access throughout the application.
 */
const configuration = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: port,
	ALLOW_LIST: allowArray,
	API_VERSION: apiVersion,
	MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
	MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME,
	SALT_ROUNDS: saltRounds,
};

/**
 * Export the configuration object for use throughout the application.
 * This allows other modules to access the environment configuration easily.
 */
export default configuration;
