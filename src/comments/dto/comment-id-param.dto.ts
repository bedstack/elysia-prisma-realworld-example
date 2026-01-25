import { type } from "arktype";
import { CuidType } from "./comment-response.dto";

export const CommentIdParamDto = type({
	id: CuidType,
	slug: "string",
});

export type CommentIdParamDto = typeof CommentIdParamDto.infer;
