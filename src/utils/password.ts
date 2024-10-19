import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing and comparison
import configuration from "./configuration"; // Import configuration settings for salt rounds

/**
 * Hashes a given password using bcrypt with the configured salt rounds.
 * This function securely hashes the password before storing it in the database.
 *
 * @param password - The plaintext password to be hashed.
 * @returns A promise that resolves to the hashed password as a string.
 */
export async function hashPassword(
	password: string,
): Promise<string> {
	/**
	 * Generate a hashed version of the password using bcrypt.
	 * The hashing process applies a secure one-way function to the password,
	 * making it difficult to reverse-engineer.
	 */
	const hashedPassword = await bcrypt.hash(
		password,
		configuration.SALT_ROUNDS, // Salt rounds define the computational cost of the hashing algorithm
	);

	// Return the hashed password
	return hashedPassword;
}

/**
 * Compares a plaintext password with a hashed password.
 * This function is used to verify user credentials during login.
 *
 * @param password - The plaintext password provided by the user.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export async function comparePassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	// Compare the plaintext password with the hashed password and return the result
	return await bcrypt.compare(password, hashedPassword);
}
