import jwt from "jsonwebtoken"; // Import the JSON Web Token (JWT) library for token generation
import { Payload } from "../types/Payload"; // Import the Payload type for typing the token's payload
import configuration from "./configuration"; // Import configuration for secret key and token expiration settings

/**
 * Type definition for the result of a token generation.
 * This includes the generated access token and its expiration time.
 */
export type TokenResult = {
	accessToken: string; // The JWT access token string
	expiresIn: number; // The duration (in seconds or string format) for which the token is valid
};

/**
 * Function to generate a JWT access token.
 * This function takes in a payload, signs it using the secret key, and returns the token along with its expiration time.
 *
 * @param payload - The payload data that will be embedded into the JWT. This typically includes user-related information.
 * @returns An object containing the generated access token and its expiration time.
 */
export function generateAccessToken(
	payload: Payload, // The payload object to be included in the JWT
): TokenResult {
	// Generate a JWT token by signing the payload with the secret key and expiration time from configuration
	const token = jwt.sign(
		payload, // Data to be embedded into the JWT
		configuration.SECRET_KEY, // Secret key used to sign the token
		{
			expiresIn: configuration.EXPIRES_IN, // Expiration time for the token
		},
	);

	// Return the generated token and its expiration time as part of the TokenResult
	return {
		accessToken: token, // The signed JWT token
		expiresIn: configuration.EXPIRES_IN, // Expiration time for the token
	};
}
