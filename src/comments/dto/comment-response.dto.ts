import { regex } from "arkregex";
import { type } from "arktype";

/**
 * CUID validation - 25 character alphanumeric string
 */
export const CuidType = type(regex("^[a-z0-9]{25}$")).describe(
	"must be a valid CUID",
);

export const CommentResponseDto = type({
	comment: {
		id: CuidType,
		body: "string",
		createdAt: "string",
		updatedAt: "string",
		author: {
			username: "string",
			bio: "string | null",
			image: "string | null",
			following: "boolean",
		},
	},
});

export type CommentResponseDto = typeof CommentResponseDto.infer;
