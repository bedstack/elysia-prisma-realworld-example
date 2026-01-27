import { type } from "arktype";
import { MAX_LIMIT, MIN_LIMIT, MIN_OFFSET } from "@/shared/constants";

export const ArticleFeedQueryDto = type({
	"limit?": `string.numeric.parse |> ${MIN_LIMIT} <= number.integer <= ${MAX_LIMIT}`,
	"offset?": `string.numeric.parse |> number.integer >= ${MIN_OFFSET}`,
});

export type ArticleFeedQueryDto = typeof ArticleFeedQueryDto.infer;
