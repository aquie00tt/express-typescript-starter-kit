import mongoose from "mongoose";
import UserModel, {
	IUserDocument,
} from "../database/models/UserModel"; // Import the user model and IUserDocument interface
import type { RegisterDTO } from "../types/dtos"; // Import RegisterDTO for user registration data

export default class UserController {
	/**
	 * Retrieves a user document by username.
	 * @param username - The username of the user to find.
	 * @returns - Returns the found user document or null if not found.
	 */
	public static async getUserByUsername(
		username: string,
	): Promise<IUserDocument | null> {
		// Find the user document in the database by username
		const user = await UserModel.findOne<IUserDocument>({
			$or: [
				{
					username,
				},
			],
		});

		return user; // Return the found user or null
	}

	/**
	 * Creates a new user document in the database.
	 * @param user - The user registration data.
	 * @returns - Returns the created user document.
	 */
	public static async registerNewUser(
		user: RegisterDTO,
	): Promise<IUserDocument> {
		// Create a new user instance with the provided registration data
		const newUser = new UserModel(user);
		await newUser.save(); // Save the new user to the database

		return newUser; // Return the newly created user document
	}

	/**
	 * Deletes a user document from the database by username.
	 * @param username - The username of the user to delete.
	 * @returns - Returns true if the user was deleted, otherwise false.
	 */
	public static async deleteUserByUsername(
		username: string,
	): Promise<boolean> {
		// Attempt to delete the user document from the database
		const result = await UserModel.deleteOne({
			username, // The username of the user to delete
		});

		// Return true if a document was deleted, otherwise return false
		return result.deletedCount > 0;
	}

	/**
	 * Finds a user document by its ID.
	 * @param id - The ID of the user to find.
	 * @returns - Returns the found user document without the password field, or null if not found.
	 */
	public static async findUserById(
		id: mongoose.Types.ObjectId,
	): Promise<Omit<IUserDocument, "password"> | null> {
		// Find the user document by ID and exclude the password from the result
		const user = await UserModel.findOne<IUserDocument>({
			$or: [
				{
					_id: id,
				},
			],
		}).select("-password");

		return user; // Return the found user document without the password
	}
}
