import BaseError from "./BaseError";

/**
 * ServerFailedError class that extends BaseError to represent a 500 Internal Server Error.
 * This error is thrown when the server encounters an unexpected condition
 * that prevents it from fulfilling a request.
 */
export default class ServerFailedError extends BaseError {
	/**
	 * Constructor for the ServerFailedError class.
	 * @param message - Optional error message, defaults to "Server Failed".
	 * This message can provide additional context about the error.
	 */
	public constructor(message = "Server Failed") {
		// Call the constructor of BaseError with the message and the 500 status code.
		super(message, 500);
	}
}
