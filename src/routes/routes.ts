import {
	type Request, // Type definition for the HTTP request object from Express.
	type Response, // Type definition for the HTTP response object from Express.
	Router, // Function from Express used to create a new router instance.
} from "express";
import configuration from "../utils/configuration"; // Utility to access application settings, including API versioning.
import getHome from "./homes"; // Function to handle requests to the home route.
import register from "./auth/register"; // Function for handling user registration requests.
import { login } from "./auth/login"; // Function for handling user login requests.
import { authentication } from "../middlewares/authentication"; // Middleware to protect routes that require authentication.
import { profile } from "./users"; // Function to handle user profile retrieval.
import {
	limiter, // Middleware for limiting the number of requests.
	criticalLimiter, // Middleware for applying critical rate limiting to specific routes.
	speedLimiter, // Middleware for applying speed limiting to requests.
} from "../middlewares/limiters";

/**
 * Create a new Router instance to define the API routes.
 */
const router = Router();

/**
 * Define the base URL for the API, incorporating versioning from the configuration.
 * The version is fetched dynamically to ensure flexibility during updates.
 */
const baseURL = `/api/v${configuration.API_VERSION}`;

/**
 * Construct the authentication URL using the base URL.
 */
const authURL = `${baseURL}/auth`;

/**
 * Construct the users URL using the base URL.
 */
const usersURL = `${baseURL}/users`;

/**
 * Redirect from the root endpoint ("/") to the base API URL.
 * This route handles GET requests to the root and redirects them to the defined base URL.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A redirection response to the base URL.
 */
router.get(
	"/",
	limiter, // Apply rate limiting middleware.
	speedLimiter, // Apply speed limiting middleware.
	(req: Request, res: Response) => {
		return res.redirect(baseURL); // Redirect to the base API URL.
	},
);

/**
 * Define the GET route for the base API URL.
 * This route handles GET requests to the base URL and executes the getHome function,
 * which returns relevant home data.
 *
 * @returns A JSON response containing home data.
 */
router.get(baseURL, limiter, speedLimiter, getHome); // Handle GET requests to the base URL.

/**
 * Define the POST route for user registration.
 * This route handles POST requests to the authentication URL for registering new users.
 *
 * @returns A JSON response indicating the result of the registration attempt.
 */
router.post(
	`${authURL}/register`,
	criticalLimiter, // Apply critical rate limiting middleware.
	speedLimiter, // Apply speed limiting middleware.
	register,
); // Handle user registration requests.

/**
 * Define the POST route for user login.
 * This route handles POST requests to the authentication URL for user login operations.
 *
 * @returns A JSON response containing the authentication result.
 */
router.post(
	`${authURL}/login`,
	criticalLimiter, // Apply critical rate limiting middleware.
	speedLimiter, // Apply speed limiting middleware.
	login,
); // Handle user login requests.

/**
 * Define the GET route for retrieving the authenticated user's profile.
 * This route requires authentication middleware to ensure only logged-in users can access it.
 *
 * @returns A JSON response containing the user's profile data.
 */
router.get(
	`${usersURL}/me`,
	limiter, // Apply rate limiting middleware.
	speedLimiter, // Apply speed limiting middleware.
	authentication, // Protect the route with authentication middleware.
	profile,
); // Handle GET requests for the authenticated user's profile.

/**
 * Export the configured router instance for use in other modules.
 */
export default router; // Export the router instance for application routing.
