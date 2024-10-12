import { Document, model, Schema } from "mongoose";

/**
 * Interface representing the Example document structure in MongoDB.
 * Extends the Mongoose Document interface to include custom fields.
 */
export interface IExample extends Document {
	/**
	 * The title of the example.
	 * @type {string}
	 * @required true
	 */
	title: string;

	/**
	 * A description of the example.
	 * @type {string}
	 * @required false
	 */
	description?: string; // Optional field
}

/**
 * Schema definition for the Example model.
 * This defines the structure of the documents within the 'examples' collection.
 */
const exampleSchema = new Schema<IExample>({
	/**
	 * Title field configuration.
	 */
	title: {
		type: String,
		required: true, // Title is required
	},

	/**
	 * Description field configuration.
	 */
	description: {
		type: String,
		required: false, // Description is optional
	},
});

/**
 * Mongoose model for the Example schema.
 * This model is associated with the 'examples' collection in MongoDB.
 */
const ExampleModel = model<IExample>(
	"Example", // Name of the model
	exampleSchema, // Schema used for the model
	"examples", // Name of the MongoDB collection
);

/**
 * Export the Example model for use in other parts of the application.
 */
export default ExampleModel;
