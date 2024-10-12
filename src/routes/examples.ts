import type {
	Request,
	Response,
	NextFunction,
} from "express";
import ServerFailedError from "../errors/ServerFailedError";
import { IDataResponse } from "../types/response";
import { IExample } from "../database/models/ExampleModel";
import ExampleController from "../controllers/ExampleController";

/**
 * Handles GET requests to retrieve examples from the ExampleController.
 * This function attempts to fetch all examples and returns them in the response.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 * @returns A response with the retrieved examples or an error if the operation fails.
 */
export async function getExamples(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response | void> {
	try {
		// Fetch all examples from the ExampleController
		const data = await ExampleController.getAll();

		// Create a response object with the retrieved data
		const response: IDataResponse<IExample[]> = {
			message: "Examples retrieved successfully",
			status: "success",
			data: data,
		};

		// Send the response with the data and a 200 status code
		return res.status(200).json(response);
	} catch {
		// If an error occurs, pass a new ServerFailedError to the next middleware
		return next(
			new ServerFailedError("Failed to retrieve examples."),
		);
	}
}
