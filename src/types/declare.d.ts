import type { Payload } from "./Payload";

/**
 * Augmenting the global NodeJS namespace to include custom environment variable types.
 * This allows TypeScript to understand the structure of the process.env object.
 */
declare global {
	namespace NodeJS {
		/**
		 * Interface representing the environment variables available in Node.js.
		 */
		interface ProcessEnv {
			/**
			 * The current environment the application is running in:
			 * Can be 'development', 'test', or 'production'.
			 * This is used to control environment-specific behavior.
			 */
			NODE_ENV: "development" | "test" | "production";

			/**
			 * The port number on which the application will listen.
			 * Should be a string that can be converted to a number.
			 * Typically used by the server to determine which port to bind to.
			 */
			PORT: string;

			/**
			 * A comma-separated list of allowed origins for CORS (Cross-Origin Resource Sharing).
			 * Used to specify which domains are allowed to access the server's resources.
			 */
			ALLOW_LIST: string;

			/**
			 * The version of the API being used.
			 * This string indicates the version number for the API, such as '1', '2', etc.
			 */
			API_VERSION: string;

			/**
			 * The URI string used to connect to the MongoDB database.
			 * This is typically in the format 'mongodb://<host>:<port>/'.
			 */
			MONGO_CONNECTION_URI: string;

			/**
			 * The name of the MongoDB database to use.
			 * Specifies which database in the MongoDB server the application will interact with.
			 */
			MONGO_DATABASE_NAME: string;

			/**
			 * The number of rounds for hashing the password using bcrypt.
			 * This defines the cost factor for the hashing algorithm,
			 * affecting the time taken to hash a password. Higher values increase security but also the time required.
			 */
			SALT_ROUNDS: string;

			/**
			 * The secret key used for signing JWT tokens.
			 * This is a critical value for token security and should be kept secret.
			 */
			SECRET_KEY: string;

			/**
			 * Defines the expiration time for JWT tokens.
			 * Typically in a format such as '1h' (1 hour) or '7d' (7 days).
			 */
			EXPIRES_IN: string;
		}
	}

	/**
	 * Augmenting the Express namespace to include custom user data in the Request object.
	 * This allows access to the authenticated user's payload within request handlers.
	 */
	namespace Express {
		interface Request {
			/**
			 * The user payload extracted from the JWT token.
			 * This will be available on the request object after authentication.
			 */
			user: Payload;
		}
	}
}

/**
 * Export an empty object to make this file a module,
 * allowing for proper module augmentation in TypeScript.
 */
export {};
