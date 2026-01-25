import { regex } from "arkregex";
import { type } from "arktype";

export const CreateUserDto = type({
	user: {
		email: "string.email",
		password: type(
			regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$"),
		)
			.and("8 <= string <= 100")
			.describe(
				"must be at least 8 characters and contain uppercase, lowercase, and numbers",
			),
		username: "string >= 2",
		"bio?": "string",
		"image?": "string.url",
	},
});

export type CreateUserDto = typeof CreateUserDto.infer;
