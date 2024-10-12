import mongoose from "mongoose";
import configuration from "../utils/configuration";
import logger from "../utils/logger";

/**
 * Establish a connection to the MongoDB database using Mongoose.
 *
 * @param uri - The MongoDB connection URI. Defaults to the value in configuration.
 * @param dbName - The name of the database to connect to. Defaults to the value in configuration.
 * @returns A promise that resolves to true if the connection was successful, false otherwise.
 */
export async function connect(
	uri = configuration.MONGO_CONNECTION_URI,
	dbName = configuration.MONGO_DATABASE_NAME,
): Promise<boolean> {
	try {
		logger.info(
			`Attempting to connect to MongoDB at ${uri}...`,
		); // Log the attempt to connect
		await mongoose.connect(uri, {
			dbName,
		});
		logger.info(
			`Successfully connected to the database: ${dbName}`,
		); // Log successful connection
		return true;
	} catch (err) {
		logger.error(
			`Failed to connect to the database: ${(err as Error).message}`,
		); // Log the error message
		return false;
	}
}

/**
 * Disconnect from the MongoDB database.
 *
 * @returns A promise that resolves to true if the disconnection was successful, false otherwise.
 */
export async function disconnect(): Promise<boolean> {
	try {
		logger.info(
			`Disconnecting from the MongoDB database...`,
		); // Log the disconnection attempt
		await mongoose.disconnect();
		logger.info(
			`Successfully disconnected from the MongoDB database.`,
		); // Log successful disconnection
		return true;
	} catch (err) {
		logger.error(
			`Failed to disconnect from the database: ${(err as Error).message}`,
		); // Log the error message
		return false;
	}
}
