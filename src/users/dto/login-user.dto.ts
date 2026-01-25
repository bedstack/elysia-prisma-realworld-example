import { type } from "arktype";

export const LoginUserDto = type({
	user: {
		email: "string.email",
		password: "string > 0",
	},
});

export type LoginUserDto = typeof LoginUserDto.infer;
