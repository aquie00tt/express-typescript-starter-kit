import bcrypt from "bcryptjs";
import configuration from "./configuration";

/**
 * Hashes a given password using bcrypt with the configured salt rounds.
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
		configuration.SALT_ROUNDS,
	);

	// Return the hashed password.
	return hashedPassword;
}
