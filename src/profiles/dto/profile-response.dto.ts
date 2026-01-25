import { type } from "arktype";

export const ProfileResponseDto = type({
	profile: {
		username: "string",
		bio: "string | null",
		image: "string | null",
		following: "boolean",
	},
});

export type ProfileResponseDto = typeof ProfileResponseDto.infer;
