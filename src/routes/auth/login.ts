import type {
	Request, // Type for the HTTP request object from Express
	Response, // Type for the HTTP response object from Express
	NextFunction, // Type for the middleware next function from Express
} from "express";
import type { LoginDTO } from "../../types/dtos"; // Import the Login Data Transfer Object type
import BadRequestError from "../../errors/BadRequestError"; // Import custom BadRequestError for error handling
import UserController from "../../controllers/UserController"; // Import UserController to manage user-related operations
import { generateAccessToken } from "../../utils/jsonwebtoken"; // Import utility to generate JWT access tokens
import type { ITokenResponse } from "../../types/response"; // Import the ITokenResponse type for defining the structure of token responses

/**
 * Handle user login functionality.
 * This function authenticates a user by their username and password,
 * generates an access token upon successful login, and returns a response.
 *
 * @param req - The HTTP request object, expected to contain a username and password in the body.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the Express stack.
 * @returns A JSON response containing the access token or an error if the login fails.
 */
export async function login(
	req: Request<object, object, LoginDTO>, // The request is typed with LoginDTO for the body containing username and password
	res: Response, // Response type for returning the token or error messages
	next: NextFunction, // Next function to pass control to the next middleware in case of errors
): Promise<Response<ITokenResponse> | void> {
	const { username, password } = req.body;

	// Check if username and password are provided
	if (!username || !password) {
		return next(
			new BadRequestError(
				"Username and password are required fields.", // Error message if fields are missing
			),
		);
	}

	// Attempt to fetch user by username from the database
	const user =
		await UserController.getUserByUsername(username);

	// If the user does not exist, return a bad request error
	if (!user) {
		return next(
			new BadRequestError("User not registered."), // Error message for non-existent user
		);
	}

	/**
	 * Compare the provided password with the stored password.
	 * This step validates the user's identity by checking if the passwords match.
	 */
	const isPasswordValid = await user.comparePassword(
		password,
		user.password,
	);

	// If the password is incorrect, return a bad request error
	if (!isPasswordValid) {
		return next(new BadRequestError("Password invalid.")); // Error message for invalid password
	}

	// Generate a JWT access token for the authenticated user
	const accessTokenResult = generateAccessToken({
		id: user.id,
		username: user.username,
	});

	// Construct the token response object to be returned
	const response: ITokenResponse = {
		message: "Login successfully.", // Success message
		status: "success", // Status of the operation
		access_token: accessTokenResult.accessToken, // The generated JWT access token
		expires_in: accessTokenResult.expiresIn, // Expiration time of the token
	};

	// Return the response with a status of 201 (Created)
	return res.status(201).json(response);
}
