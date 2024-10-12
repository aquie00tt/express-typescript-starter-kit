import { type Request, type Response } from "express";
import HomeController from "../controllers/HomeController";
import { IMessageResponse } from "../types/response";

/**
 * Handle GET requests for the home route.
 * This function responds with a JSON object containing the home data.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A response object with a status code of 200 and a JSON payload.
 */
export default function getHome(
	req: Request,
	res: Response,
): Response<IMessageResponse> {
	/**
	 * Return a JSON response with the home data retrieved from the HomeController.
	 */
	return res.status(200).json(HomeController.get());
}
