import BaseError from "./BaseError"; // Import the BaseError class for custom error handling

/**
 * Custom error class representing a bad request error.
 * Inherits from the BaseError class.
 */
export default class BadRequestError extends BaseError {
	/**
	 * Creates an instance of BadRequestError.
	 * @param message - Optional custom error message (default is "BadRequest").
	 */
	public constructor(message = "BadRequest") {
		super(message, 400); // Call the constructor of BaseError with the message and HTTP status code 400
	}
}
