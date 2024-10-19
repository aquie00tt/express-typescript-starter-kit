import request from "supertest";
import app from "../src/app";
import { connect, disconnect } from "../src/database";
import { IUser } from "../src/database/models/UserModel";

const testUser: IUser = {
	username: "testuser",
	password: "12345678",
};

describe("Users Routes", () => {
	let accessToken: string;

	beforeAll(async () => {
		await connect();

		const loginResponse = await request(app)
			.post("/api/v1/auth/login")
			.send(testUser);

		accessToken = loginResponse.body.access_token;
	});

	afterAll(async () => {
		await disconnect();
	});

	test("GET - /api/v1/users/me", async () => {
		const response = await request(app)
			.get("/api/v1/users/me")
			.set("Authorization", `Bearer ${accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.data).toBeDefined();
	});
});
