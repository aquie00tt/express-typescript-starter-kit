import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Error handling tests", () => {
	// 404 Not Found Test
	test("Should return 404 for non-existent routes", async () => {
		const response = await request(app).get(
			"/nonexistent-route",
		);
		expect(response.statusCode).toBe(404);
		expect(response.body).toEqual({
			status: "fail",
			message:
				'The requested resource at "/nonexistent-route" could not be found. Please check the URL and try again.',
		});
	});
});
