import BaseError from "./BaseError";

/**
 * Class representing an UnauthorizedError.
 * This error is used when authentication is required but has failed or has not been provided.
 * It extends the BaseError class to include a custom error message and a 401 status code.
 */
export default class UnauthorizedError extends BaseError {
	/**
	 * Constructor for UnauthorizedError.
	 * By default, it sets the message to "Unauthorized" and the HTTP status code to 401.
	 *
	 * @param message - Custom error message (optional).
	 */
	public constructor(message = "Unauthorized") {
		// Pass the message and status code to the BaseError constructor
		super(message, 401);
	}
}
