import {
	type Request, // Import the Request type from express for type annotations
	type Response, // Import the Response type from express for type annotations
	Router, // Import the Router function from express to create route handlers
} from "express";
import configuration from "../utils/configuration"; // Import the configuration utility for API versioning
import getHome from "./homes"; // Import the getHome function to handle the home route
import register from "./auth/register"; // Import the register function to handle user registration

/**
 * Create a new Router instance for defining API routes.
 */
const router = Router();

/**
 * Define the base URL for API versioning.
 * The version is fetched from the configuration utility.
 */
const baseURL = `/api/v${configuration.API_VERSION}`;

/**
 * Construct the authentication URL using the base URL.
 */
const authURL = `${baseURL}/auth`;

/**
 * Redirects from the root endpoint to the base API URL.
 * This route handles GET requests to the root ("/") and redirects them to the base URL.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A redirection response to the base URL.
 */
router.get("/", (req: Request, res: Response) => {
	return res.redirect(baseURL); // Redirect to the base URL
});

/**
 * Define the GET route for the base API URL.
 * This route handles GET requests to the base URL and executes the getHome function.
 *
 * @returns A JSON response containing home data.
 */
router.get(baseURL, getHome); // Handle GET requests to the base URL

/**
 * Define the POST route for user registration.
 * This route handles POST requests to the authentication URL for user registration.
 */
router.post(`${authURL}/register`, register); // Handle user registration

/**
 * Export the router instance for use in other modules.
 */
export default router; // Export the configured router instance
