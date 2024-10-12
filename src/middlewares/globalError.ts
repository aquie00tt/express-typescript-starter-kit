import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/BaseError";
import configuration from "../utils/configuration";
import {
	IErrorResponse,
	IMessageResponse,
} from "../types/response";

/**
 * Global error handling middleware for Express applications.
 * This middleware formats and sends error responses to the client.
 *
 * @param err - The error object, should be an instance of BaseError.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack, unused in this case.
 * @returns A JSON response with error details.
 */
export default function globalError(
	err: BaseError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
): Response<IMessageResponse | IErrorResponse> {
	/** Send the error response with the appropriate status code and message. */
	return res.status(err.statusCode).json({
		message: err.message,
		status: err.status,
		/** Include the stack trace only in development mode for debugging. */
		stack:
			configuration.NODE_ENV === "development"
				? err.stack
				: undefined,
	});
}
