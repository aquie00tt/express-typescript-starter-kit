import type { Status } from "./Status";

/**
 * Interface representing a successful message response.
 * This is typically used to convey information back to the client.
 */
export interface IMessageResponse {
	/**
	 * A descriptive message related to the response.
	 * This could indicate success, provide information, or describe a result.
	 */
	message: string;

	/**
	 * The status of the response, indicating success or failure.
	 * This should conform to the Status type defined elsewhere in the codebase.
	 */
	status: Status;
}

/**
 * Interface representing an error response.
 * This extends IMessageResponse to include additional information related to errors.
 */
export interface IErrorResponse extends IMessageResponse {
	/**
	 * An optional stack trace string for debugging purposes.
	 * This is included only in development environments to assist in tracing errors.
	 */
	stack?: string;
}

/**
 * Interface representing a data response, which extends IMessageResponse.
 * This includes an additional `data` property to return requested data to the client.
 *
 * @template T - The type of data being returned in the response.
 */
export interface IDataResponse<T> extends IMessageResponse {
	/**
	 * The data associated with the response.
	 * This could be any type of data, depending on the specific context of the response.
	 */
	data: T;
}

/**
 * Interface representing a token response.
 * This extends IMessageResponse to include information about the generated access token.
 */
export interface ITokenResponse extends IMessageResponse {
	/**
	 * The generated access token for authentication.
	 */
	access_token: string;

	/**
	 * The duration in seconds until the access token expires.
	 */
	expires_in: number;
}
