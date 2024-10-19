import { IUser } from "../database/models/UserModel";

/**
 * Data Transfer Object (DTO) for user registration.
 * This type represents the structure of user data
 * that is required for the registration process.
 */
export type RegisterDTO = IUser;

export type LoginDTO = IUser;
