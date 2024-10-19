import { config } from "dotenv"; // Import the dotenv package to load environment variables from a .env file

/**
 * Load environment variables from the appropriate .env file based on NODE_ENV.
 * This allows for different configurations depending on the environment.
 * For example, `.env.development` or `.env.production` can be used.
 */
config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * Check if the PORT environment variable is defined.
 * If not, throw an error with a descriptive message to inform the developer.
 */
if (!process.env.PORT) {
	throw new Error(
		"PORT is not defined. Please add a PORT value in your .env file.",
	);
}

/**
 * Convert the PORT environment variable to a number.
 * The port is needed to specify which port the server should listen on.
 */
const port = Number(process.env.PORT);

/**
 * Validate the PORT value to ensure it is a valid number
 * within the acceptable range (0-65535). If not, an error is thrown.
 */
if (isNaN(port) || port < 0 || port > 65535) {
	throw new Error(
		"Invalid PORT value. PORT must be a number between 0 and 65535.",
	);
}

/**
 * Check if the ALLOW_LIST environment variable is defined.
 * This is used to define which domains are allowed for CORS.
 */
if (!process.env.ALLOW_LIST) {
	throw new Error(
		"ALLOW_LIST is not defined. Please add an ALLOW_LIST value in your .env file.",
	);
}

/**
 * Split the ALLOW_LIST string into an array for easier handling.
 * This array will be used to specify multiple allowed origins for CORS configuration.
 */
const allowArray = process.env.ALLOW_LIST.split(",");

/**
 * Check if the API_VERSION environment variable is defined.
 * If missing, an error is thrown. The API version is used for versioning API routes.
 */
if (!process.env.API_VERSION) {
	throw new Error(
		"API_VERSION is not defined. Please add an API_VERSION value in your .env file.",
	);
}

/**
 * Convert the API_VERSION environment variable to a number.
 * This ensures that the version number can be used programmatically.
 */
const apiVersion = Number(process.env.API_VERSION);

/**
 * Validate the API_VERSION value to ensure it is a valid number.
 * If the value is not a number, an error is thrown.
 */
if (isNaN(apiVersion)) {
	throw new Error(
		"Invalid API_VERSION value. API_VERSION must be a number.",
	);
}

/**
 * Check if the MONGO_CONNECTION_URI environment variable is defined.
 * This URI is required to connect to the MongoDB database.
 */
if (!process.env.MONGO_CONNECTION_URI) {
	throw new Error(
		"MONGO_CONNECTION_URI is not defined. Please add a MONGO_CONNECTION_URI value in your .env file.",
	);
}

/**
 * Check if the MONGO_DATABASE_NAME environment variable is defined.
 * This specifies the name of the MongoDB database being used.
 */
if (!process.env.MONGO_DATABASE_NAME) {
	throw new Error(
		"MONGO_DATABASE_NAME is not defined. Please add a MONGO_DATABASE_NAME value in your .env file.",
	);
}

/**
 * Check if the SALT_ROUNDS environment variable is defined.
 * This variable specifies the number of salt rounds to use for password hashing.
 */
if (!process.env.SALT_ROUNDS) {
	throw new Error(
		"SALT_ROUNDS is not defined. Please add a SALT_ROUNDS value in your .env file.",
	);
}

/**
 * Convert the SALT_ROUNDS environment variable to a number.
 * The number of salt rounds affects the security and performance of password hashing.
 */
const saltRounds = Number(process.env.SALT_ROUNDS);

/**
 * Validate the SALT_ROUNDS value to ensure it is a valid number.
 * If the value is not a number, an error is thrown.
 */
if (isNaN(saltRounds)) {
	throw new Error(
		"Invalid SALT_ROUNDS value. SALT_ROUNDS must be a number.",
	);
}

/**
 * Check if the SECRET_KEY environment variable is defined.
 * The secret key is used for signing JSON Web Tokens (JWTs).
 */
if (!process.env.SECRET_KEY) {
	throw new Error(
		"SECRET_KEY is not defined. Please add a SECRET_KEY value in your .env file.",
	);
}

/**
 * Check if the EXPIRES_IN environment variable is defined.
 * This defines the expiration time for tokens generated in the application.
 */
if (!process.env.EXPIRES_IN) {
	throw new Error(
		"EXPIRES_IN is not defined. Please add an EXPIRES_IN value in your .env file.",
	);
}

/**
 * Convert the EXPIRES_IN environment variable to a number.
 * This defines how long the generated token will be valid.
 */
const expiresIn = Number(process.env.EXPIRES_IN);

/**
 * Validate the EXPIRES_IN value to ensure it is a valid number.
 * If the value is not a number, an error is thrown.
 */
if (isNaN(expiresIn)) {
	throw new Error(
		"Invalid EXPIRES_IN value. EXPIRES_IN must be a number.",
	);
}

/**
 * Set up the configuration object to hold the application's environment settings.
 * This object centralizes the configuration values for easy access throughout the application.
 */
const configuration = {
	NODE_ENV: process.env.NODE_ENV, // The current environment (e.g., development, production)
	PORT: port, // The port the application will listen on
	ALLOW_LIST: allowArray, // List of allowed origins for CORS
	API_VERSION: apiVersion, // Version of the API
	MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI, // MongoDB connection URI
	MONGO_DATABASE_NAME: process.env.MONGO_DATABASE_NAME, // MongoDB database name
	SALT_ROUNDS: saltRounds, // Number of salt rounds for password hashing
	SECRET_KEY: process.env.SECRET_KEY, // Secret key for JWT signing
	EXPIRES_IN: expiresIn, // Token expiration time
};

/**
 * Export the configuration object for use throughout the application.
 * This allows other modules to access the environment configuration easily.
 */
export default configuration;
