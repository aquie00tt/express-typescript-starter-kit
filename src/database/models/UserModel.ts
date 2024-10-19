import { Document, Schema, model } from "mongoose"; // Import necessary modules from mongoose
import { hashPassword } from "../../utils/password"; // Import the password hashing utility

export interface IUser {
	username: string; // The username of the user
	password: string; // The password of the user
}

/**
 * Interface that represents the User document in MongoDB, extending the Document interface.
 */
export interface IUserDocument extends Document, IUser {}

/**
 * Schema for the User document, defining the structure and validation rules for user data.
 */
const userSchema = new Schema<IUserDocument>({
	/**
	 * The username field.
	 * - Required: true
	 * - Must be unique.
	 * - Minimum length: 2 characters.
	 * - Maximum length: 100 characters.
	 * - Only alphanumeric characters are allowed.
	 */
	username: {
		type: String, // Data type of the username
		required: [true, "Username is required."], // Validation rule for required field
		unique: true, // Validation rule for uniqueness
		minlength: [
			2,
			"Username must be at least 2 characters long.", // Validation error message
		],
		maxlength: [
			100,
			"Username cannot exceed 100 characters.", // Validation error message
		],
		match: [
			/^[a-zA-Z0-9]+$/, // Regex pattern to allow only alphanumeric characters
			"Username can only contain alphanumeric characters.", // Validation error message
		],
	},

	/**
	 * The password field.
	 * - Required: true
	 * - Minimum length: 8 characters.
	 * - Maximum length: 200 characters.
	 */
	password: {
		type: String, // Data type of the password
		required: [true, "Password is required"], // Validation rule for required field
		minlength: [
			8,
			"Password must be at least 8 characters long.", // Validation error message
		],
		maxlength: [
			200,
			"Password cannot exceed 200 characters.", // Validation error message
		],
	},
});

/**
 * Pre-save middleware to hash the password before saving the user document.
 * @param next - Function to call the next middleware in the stack.
 */
userSchema.pre<IUserDocument>(
	"save",
	async function (next) {
		// If the password is not modified, proceed to the next middleware
		if (!this.isModified("password")) return next();

		// Hash the password and assign it back to the user document
		const hashedPassword = await hashPassword(
			this.password,
		);

		this.password = hashedPassword; // Set the hashed password

		next(); // Call the next middleware
	},
);

/**
 * User model to interact with the 'users' collection in MongoDB.
 */
const UserModel = model<IUserDocument>(
	"User", // Name of the model
	userSchema, // Schema for the model
	"users", // Name of the collection in MongoDB
);

export default UserModel; // Export the UserModel
