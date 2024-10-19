import BaseError from "./BaseError";

/**
 * Class representing a ForbiddenError.
 * This error is used to indicate that the client does not have permission
 * to access a specific resource or perform a specific action.
 * It extends the BaseError class to include a custom error message and a 403 status code.
 */
export default class ForbiddenError extends BaseError {
	/**
	 * Constructor for ForbiddenError.
	 * By default, it sets the message to "ForbiddenError" and the HTTP status code to 403.
	 *
	 * @param message - Custom error message (optional).
	 */
	public constructor(message = "ForbiddenError") {
		// Pass the message and status code to the BaseError constructor
		super(message, 403);
	}
}
