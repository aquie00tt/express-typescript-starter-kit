import type { Status } from "../types/Status";

/**
 * BaseError class that extends the built-in Error class to handle custom error logic.
 * Provides additional context like HTTP status code and status ("fail" or "error").
 */
export default class BaseError extends Error {
	/** Readonly status field, determines if the error is a client (4xx) or server (5xx) error. */
	public readonly status: Status;

	/**
	 * Constructor for the BaseError class.
	 * @param message - The error message describing what went wrong.
	 * @param statusCode - The HTTP status code associated with the error (e.g., 404, 500).
	 */
	public constructor(
		message: string,
		public readonly statusCode: number,
	) {
		super(message); // Call the parent Error constructor with the message.

		/**
		 * Determine the status based on the HTTP status code (4xx -> "fail", 5xx -> "error").
		 */
		this.status = statusCode.toString().startsWith("4")
			? "fail"
			: "error";

		/** Assign the name of the current error class to the error object. */
		this.name = this.constructor.name;

		/** Capture the stack trace for debugging purposes. */
		Error.captureStackTrace(this, this.constructor);
	}
}
