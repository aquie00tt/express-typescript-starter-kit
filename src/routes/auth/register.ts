import type {
	Request,
	Response,
	NextFunction,
} from "express"; // Import Request, Response, and NextFunction types from Express
import type { RegisterDTO } from "../../types/dtos"; // Import RegisterDTO for user registration data
import BadRequestError from "../../errors/BadRequestError"; // Import BadRequestError class for error handling
import UserController from "../../controllers/UserController"; // Import UserController for user operations
import type { IMessageResponse } from "../../types/response"; // Import IMessageResponse for message response type
import ServerFailedError from "../../errors/ServerFailedError"; // Import ServerFailedError class for server errors
import mongoose from "mongoose"; // Import Mongoose

/**
 * Asynchronous middleware function for user registration.
 * @param req - The request object from the client.
 * @param res - The response object to be sent back to the client.
 * @param next - Function to call the next middleware or handle errors.
 * @returns - Returns a message or throws an error.
 */
export default async function register(
	req: Request<object, object, RegisterDTO>, // Specify the request type as RegisterDTO
	res: Response, // Response type
	next: NextFunction, // Next function for error handling
): Promise<void | Response<IMessageResponse>> {
	const { username, password } = req.body; // Extract username and password from the request body

	// Check if username and password are required fields; throw an error if missing
	if (!username || !password) {
		return next(
			new BadRequestError(
				"username and password required fields.", // Error message
			),
		);
	}

	// Check if a user with the given username already exists
	const foundUser =
		await UserController.getUserByUsername(username);

	// If the user already exists, throw a BadRequestError
	if (foundUser) {
		return next(
			new BadRequestError("This email already exists."), // Error message
		);
	}

	try {
		// Create a new user
		await UserController.registerNewUser({
			username,
			password,
		});

		// Prepare the success response message
		const response: IMessageResponse = {
			message: "User Created.",
			status: "success",
		};

		// Send a 201 response with the success message
		return res.status(201).json(response);
	} catch (err) {
		// Handle validation errors from Mongoose
		if (err instanceof mongoose.Error.ValidationError) {
			return next(new BadRequestError(err.message)); // Forward the error message
		}

		// Handle other server errors
		return next(
			new ServerFailedError((err as Error).message), // Forward the server error message
		);
	}
}
