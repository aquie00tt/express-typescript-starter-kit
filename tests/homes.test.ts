import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("Home Routes", () => {
	test("GET /api/v1 - should return a welcome message", async () => {
		const response = await request(app).get("/api/v1");
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			message: "Welcome To The API",
			status: "success",
		});
	});
});
