import mongoose from "mongoose";

/**
 * Type definition for the JWT payload.
 * The payload will contain user data, but the password field is omitted for security reasons.
 */
export type Payload = {
	id: mongoose.Types.ObjectId;
	username: string;
}; // Omit the 'password' field from IUser, as it should not be included in the token
