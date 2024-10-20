/**
 * Speed Limiter & Rate Limiter
 */
import {
	type Options, // Type definition for rate limit options.
	rateLimit, // Importing the rateLimit middleware from express-rate-limit.
} from "express-rate-limit"; // Importing the express-rate-limit package.
import RateLimitError from "../errors/RateLimitError"; // Importing the custom RateLimitError class for handling rate limit errors.
import { slowDown } from "express-slow-down"; // Importing the slowDown middleware for delaying requests.

const limiterOptions: Partial<Options> = {
	standardHeaders: "draft-7", // Enable standard rate limit headers (RFC draft 7).
	legacyHeaders: false, // Disable legacy headers for backward compatibility.

	/**
	 * Custom function to determine whether to skip rate limiting.
	 *
	 * @param req - The HTTP request object.
	 * @returns A boolean indicating whether to skip rate limiting.
	 */
	skip: (req) => {
		const ips = ["127.0.0.1", "::1"]; // Localhost IP addresses (IPv4 and IPv6).
		return ips.includes(req.ip!); // Skip rate limiting if the request IP is in the skip list.
	},

	/**
	 * Custom handler for rate limit exceeded cases.
	 *
	 * @param req - The HTTP request object.
	 * @param res - The HTTP response object.
	 * @param next - The next middleware function.
	 */
	handler: (req, res, next) => {
		// Create a new RateLimitError with a descriptive message and pass it to the next middleware.
		next(
			new RateLimitError(
				"You have exceeded the number of allowed requests. Please try again later.",
			),
		);
	},
};

// Configuring the rate limiter with general limits
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // Time window for the rate limit (15 minutes).
	limit: 100, // Maximum number of requests allowed within the time window.
	...limiterOptions, // Spread the limiter options defined above.
});

// Configuring a critical rate limiter with stricter limits
const criticalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // Time window for the rate limit (15 minutes).
	limit: 20, // Maximum number of requests allowed for critical routes within the time window.
	...limiterOptions, // Spread the limiter options defined above.
});

// Configuring the speed limiter to slow down requests after a certain number of hits
const speedLimiter = slowDown({
	windowMs: 15 * 60 * 1000, // Time window for the speed limiter (15 minutes).
	delayAfter: 5, // Number of requests before the delay starts.
	delayMs: (hits) => hits * 100, // Delay in milliseconds based on the number of hits.
});

// Exporting the configured limiters for use in other modules.
export { limiter, criticalLimiter, speedLimiter }; // Export the rate limiter instances.
