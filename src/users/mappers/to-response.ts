import type { User } from "@prisma/client";
import type { SignFn } from "@/shared/plugins";
import type { UserResponseDto } from "../dto";

/**
 * Map a user to a response
 * @param user The user to map
 * @param sign The function to sign the user
 * @returns The mapped user
 */
export const toResponse = async (
	{ email, username, bio, image, id }: User,
	sign: SignFn,
): Promise<UserResponseDto> => ({
	user: {
		token: await sign({ uid: id, email, username }),
		email,
		username,
		bio,
		image,
	},
});
