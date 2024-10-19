import type {
	Request,
	Response,
	NextFunction,
} from "express";
import UnauthorizedError from "../errors/UnauthorizedError"; // Import the custom UnauthorizedError class for handling authorization errors
import { verifyToken } from "../utils/jsonwebtoken"; // Import the utility function to verify JWT tokens
import ForbiddenError from "../errors/ForbiddenError"; // Import the custom ForbiddenError class for handling access errors

/**
 * Middleware function for authenticating requests using JWT.
 * This function checks for the presence of a valid JWT in the Authorization header.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function to call.
 */
export function authentication(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	// Retrieve the Authorization header from the request
	const authHeader = req.headers["authorization"];

	// Check if the Authorization header is missing
	if (!authHeader) {
		// If missing, call the next middleware with an UnauthorizedError
		return next(
			new UnauthorizedError(
				"Authorization header is missing.", // Error message for missing header
			),
		);
	}

	// Extract the token from the Authorization header (format: "Bearer <token>")
	const token = authHeader.split(" ")[1];

	// Verify the token using the verifyToken utility function
	const payload = verifyToken(token);

	// Check if the payload is invalid or missing
	if (!payload) {
		// If verification fails, call the next middleware with a ForbiddenError
		return next(
			new ForbiddenError("Invalid or expired token."), // Error message for invalid/expired token
		);
	}

	// Attach the decoded user payload to the request object for later use
	req.user = payload;

	// Proceed to the next middleware or route handler
	return next();
}
