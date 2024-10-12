import {
	type Request,
	type Response,
	Router,
} from "express";
import configuration from "../utils/configuration";
import getHome from "./homes";
import { getExamples } from "./examples";

/**
 * Create a new Router instance.
 */
const router = Router();

/**
 * Define the base URL for the API versioning.
 */
const baseURL = `/api/v${configuration.API_VERSION}`;

/**
 * Redirect from the root endpoint to the base API URL.
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
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A JSON response containing home data.
 */
router.get(baseURL, getHome);

router.get(`${baseURL}/examples`, getExamples);

/**
 * Export the router instance for use in other modules.
 */
export default router;
