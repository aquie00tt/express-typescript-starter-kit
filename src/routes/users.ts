import type {
	Request,
	Response,
	NextFunction,
} from "express"; // Importing necessary types from Express framework.
import UserController from "../controllers/UserController"; // Importing the UserController to handle user-related operations.
import NotFoundError from "../errors/NotFoundError"; // Importing a custom error class for handling not found errors.
import type { IDataResponse } from "../types/response"; // Importing the response interface for standardized responses.
import type { IUserDocument } from "../database/models/UserModel"; // Importing the user document interface to define the structure of user data.

/**
 * Middleware function to retrieve and return the profile information of the authenticated user.
 * @param req - The Express request object, containing user information in req.user.
 * @param res - The Express response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the Express stack to call if an error occurs.
 * @returns A JSON response containing user data without the password field, or an error if the user is not found.
 */
export async function profile(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response<
	IDataResponse<Omit<IUserDocument, "password">>
> | void> {
	// Attempt to find the user by ID from the authenticated request.
	const user = await UserController.findUserById(
		req.user.id,
	);

	// If the user is not found, call the next middleware with a NotFoundError.
	if (!user) {
		return next(new NotFoundError("User Not Found."));
	}

	// Prepare the response data, excluding the password field for security reasons.
	const response: IDataResponse<
		Omit<IUserDocument, "password">
	> = {
		message: "User Data", // Message indicating success.
		status: "success", // Status of the response.
		data: user, // User data returned in the response.
	};

	// Send a 200 OK response with the user data in JSON format.
	return res.status(200).json(response);
}
