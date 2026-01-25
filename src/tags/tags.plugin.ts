import { Elysia } from "elysia";
import { db } from "@/core/db";
import { TagsResponseDto } from "./dto";

export const tags = new Elysia({
	tags: ["Tags"],
}).get(
	"/tags",
	async () => {
		const allTags = await db.tag.findMany();
		return {
			tags: allTags.map((tag) => tag.name),
		};
	},
	{
		detail: {
			summary: "Get Tags",
			description: "Returns a list of all tags. No authentication required.",
		},
		response: TagsResponseDto,
	},
);
