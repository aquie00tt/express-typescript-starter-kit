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
			 * can be 'development', 'test', or 'production'.
			 */
			NODE_ENV: "development" | "test" | "production";

			/**
			 * The port number on which the application will listen.
			 * Should be a string that can be converted to a number.
			 */
			PORT: string;

			/**
			 * A comma-separated list of allowed origins for CORS (Cross-Origin Resource Sharing).
			 */
			ALLOW_LIST: string;

			/**
			 * The version of the API being used.
			 * This string indicates the version number for the API.
			 */
			API_VERSION: string;
			/**
			 * M
			 */
			MONGO_CONNECTION_URI: string;
			/**
			 *
			 */
			MONGO_DATABASE_NAME: string;
		}
	}
}

/**
 * Export an empty object to make this file a module,
 * allowing for proper module augmentation in TypeScript.
 */
export {};
