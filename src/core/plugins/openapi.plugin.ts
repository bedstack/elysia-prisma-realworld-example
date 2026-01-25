import { openapi as openapiPlugin } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import type { Type } from "arktype";
import { Elysia } from "elysia";
import { description, title } from "../../../package.json";

const path = "/docs";

type ScalarOptions = NonNullable<Parameters<typeof openapiPlugin>[0]>["scalar"];

export const openapi = new Elysia()
	.use(staticPlugin())
	.use(
		openapiPlugin({
			documentation: {
				info: { title, version: "", description },
				components: {
					securitySchemes: {
						tokenAuth: {
							type: "apiKey",
							description:
								'Prefix the token with "Token ", e.g. "Token jwt.token.here"',
							in: "header",
							name: "Authorization",
						},
					},
				},
			},
			path,
			scalar: {
				favicon: "/public/icon-dark.svg",
				persistAuth: true,
			} as ScalarOptions,
			/**
			 * Custom mapping from ArkType to JSON Schema for OpenAPI documentation.
			 * Uses ArkType's native toJsonSchema with a fallback to handle
			 * non-serializable constraints gracefully.
			 */
			mapJsonSchema: {
				arktype: (type: Type) =>
					type.toJsonSchema({
						fallback: (ctx) => ctx.base,
					}),
			},
		}),
	)
	.get("/", ({ redirect }) => redirect(path));
