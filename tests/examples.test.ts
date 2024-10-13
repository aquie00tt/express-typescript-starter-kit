import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";
import { connect, disconnect } from "../src/database/index";

describe("Example Routes", () => {
	beforeAll(async () => {
		await connect();
	});

	afterAll(async () => {
		await disconnect();
	});

	test("Should return all examples on GET - /api/v1/examples", async () => {
		const response = await request(app).get(
			"/api/v1/examples",
		);

		expect(response.body.data).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body.status).toBe("success");
	});
});
