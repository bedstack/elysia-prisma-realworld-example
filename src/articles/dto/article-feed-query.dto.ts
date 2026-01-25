import { type } from "arktype";

/**
 * DTO for article feed query parameters.
 * Uses offset-based pagination with the following constraints:
 * - limit: number of items per request (default: DEFAULT_LIMIT, min: MIN_LIMIT, max: MAX_LIMIT)
 * - offset: number of items to skip (default: DEFAULT_OFFSET, min: MIN_OFFSET)
 *
 * Accepts string or number for query parameters (HTTP sends strings, but tests may send numbers).
 * Uses morphs to coerce to number and apply constraints.
 */
export const ArticleFeedQueryDto = type({
	"limit?": type("string | number").pipe((v) =>
		typeof v === "string" ? Number.parseInt(v, 10) : v,
	),
	"offset?": type("string | number").pipe((v) =>
		typeof v === "string" ? Number.parseInt(v, 10) : v,
	),
});

export type ArticleFeedQueryDto = typeof ArticleFeedQueryDto.infer;
