import {
	type Request,
	type Response,
	Router,
} from "express";
import configuration from "../utils/configuration";
import getHome from "./homes";

/**
 * Create a new Router instance.
 */
const router = Router();

/**
 * Define the base URL for API versioning.
 */
const baseURL = `/api/v${configuration.API_VERSION}`;

/**
 * Redirects from the root endpoint to the base API URL.
 * This route handles GET requests to the root ("/") and redirects them to the base URL.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A redirection response to the base URL.
 */
router.get("/", (req: Request, res: Response) => {
	return res.redirect(baseURL);
});

/**
 * Define the GET route for the base API URL.
 * This route handles GET requests to the base URL and executes the getHome function.
 *
 * @returns A JSON response containing home data.
 */
router.get(baseURL, getHome);
/**
 * Export the router instance for use in other modules.
 */
export default router;
