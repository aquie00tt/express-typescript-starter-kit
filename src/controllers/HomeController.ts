import { IMessageResponse } from "../types/response";

/**
 * HomeController is responsible for handling home-related operations.
 * This class contains methods related to the home route.
 */
export default class HomeController {
	/**
	 * Retrieves the home information.
	 *
	 * @returns An IMessageResponse object containing the welcome message and status.
	 */
	public static get(): IMessageResponse {
		return {
			message: "Welcome To The API",
			status: "success",
		};
	}
}
