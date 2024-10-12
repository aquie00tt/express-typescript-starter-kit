import BaseError from "./BaseError";

/**
 * NotFoundError class that extends BaseError to represent a 404 Not Found error.
 * This error is thrown when a requested resource cannot be found.
 */
export default class NotFoundError extends BaseError {
	/**
	 * Constructor for the NotFoundError class.
	 * @param message - Optional error message, defaults to "Not Found".
	 */
	public constructor(message = "Not Found") {
		// Call the constructor of BaseError with the message and the 404 status code.
		super(message, 404);
	}
}
