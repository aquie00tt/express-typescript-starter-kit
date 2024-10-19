import { describe, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";
import { connect, disconnect } from "../src/database/index";
import { IUser } from "../src/database/models/UserModel";
import UserController from "../src/controllers/UserController";

const testUser: IUser = {
	username: "testuser",
	password: "12345678",
};

describe("Auth Routes", () => {
	beforeAll(async () => {
		await connect();

		const foundUser =
			await UserController.getUserByUsername(
				testUser.username,
			);

		if (foundUser) {
			await UserController.deleteUserByUsername(
				testUser.username,
			);
		}
	});

	afterAll(async () => {
		await disconnect();
	});

	test("POST - /api/v1/auth/register", async () => {
		const response = await request(app)
			.post("/api/v1/auth/register")
			.send(testUser);

		expect(response.statusCode).toBe(201);
		expect(response.body).toBeDefined();
	});

	test("POST - /api/v1/auth/login", async () => {
		const response = await request(app)
			.post("/api/v1/auth/login")
			.send(testUser);

		expect(response.statusCode).toBe(201);
		expect(response.body.access_token).toBeDefined();
		expect(response.body.expires_in).toBeDefined();
	});
});
