import { IUser } from "../database/models/UserModel"; // Import the IUser interface, representing a user schema from the database

/**
 * Type definition for the JWT payload.
 * The payload will contain user data, but the password field is omitted for security reasons.
 */
export type Payload = Omit<IUser, "password">; // Omit the 'password' field from IUser, as it should not be included in the token
