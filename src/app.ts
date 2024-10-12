import express from "express";
import cors from "cors";
import type { Server } from "http";
import configuration from "./utils/configuration";
import helmet from "helmet";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundError";
import globalError from "./middlewares/globalError";
import logger from "./utils/logger";
import router from "./routes/routes";

/**
 * Create an instance of the Express application.
 */
const app = express();

/**
 * Enable CORS (Cross-Origin Resource Sharing) for specified origins.
 * This allows the application to accept requests from different domains.
 */
app.use(
	cors({
		origin: configuration.ALLOW_LIST,
		methods: ["GET", "POST", "PUT", "DELETE"],
		optionsSuccessStatus: 204,
	}),
);

/**
 * Set security-related HTTP headers using Helmet.
 * This helps protect the app from well-known vulnerabilities.
 */
app.use(helmet());

/**
 * Parse incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Parse incoming requests with URL-encoded payloads.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Enable request logging using Morgan.
 * The logging format varies based on the environment.
 */
app.use(
	morgan(
		configuration.NODE_ENV === "development"
			? "dev"
			: "combined",
	),
);

/**
 * Use the router for handling routes.
 */
app.use(router);

/**
 * Define a catch-all route to handle 404 Not Found errors.
 * This middleware will be called when no other routes match.
 */
app.use("*", notFoundError);

/**
 * Global error handling middleware to handle errors that occur in the application.
 */
app.use(globalError);

/**
 * Initialize the server and start listening on the specified port.
 * The default port is taken from the configuration.
 *
 * @param port - The port number on which the server will listen.
 * @returns A Server instance.
 */
export function initServer(
	port: number = configuration.PORT,
): Server {
	return app.listen(port, () => {
		logger.info(
			`Server is listening at http://localhost:${port.toString()}`,
		);
	});
}

/**
 * Export the Express application instance for use in other modules.
 */
export default app;
