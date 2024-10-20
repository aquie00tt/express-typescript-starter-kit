import BaseError from "./BaseError";

/**
 * The RateLimitError class is a custom error class used to represent
 * situations where the request limit has been exceeded.
 * @extends BaseError
 */
export default class RateLimitError extends BaseError {
	/**
	 * @constructor
	 * @param [message="Rate limit exceeded"] - The error message (default: "Rate limit exceeded").
	 */
	public constructor(message = "Rate limit exceeded") {
		// Call the BaseError constructor to set the error message and status code
		super(message, 429); // 429: Too Many Requests
	}
}
