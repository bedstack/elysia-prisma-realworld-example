import { type } from "arktype";
import {
	DEFAULT_LIMIT,
	DEFAULT_OFFSET,
	MAX_LIMIT,
	MIN_LIMIT,
	MIN_OFFSET,
} from "@/shared/constants";

/**
 * DTO for article feed query parameters.
 * Uses offset-based pagination with the following constraints:
 * - limit: number of items per request (default: DEFAULT_LIMIT, min: MIN_LIMIT, max: MAX_LIMIT)
 * - offset: number of items to skip (default: DEFAULT_OFFSET, min: MIN_OFFSET)
 *
 * Uses string.numeric.parse to coerce query string parameters to numbers.
 * Default values are provided as strings which get parsed to numbers.
 */
export const ArticleFeedQueryDto = type({
	limit: type("string.numeric.parse")
		.to(`${MIN_LIMIT} <= number.integer <= ${MAX_LIMIT}`)
		.default(`${DEFAULT_LIMIT}`),
	offset: type("string.numeric.parse")
		.to(`number.integer >= ${MIN_OFFSET}`)
		.default(`${DEFAULT_OFFSET}`),
});

export type ArticleFeedQueryDto = typeof ArticleFeedQueryDto.infer;
