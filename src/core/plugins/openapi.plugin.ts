import { openapi as openapiPlugin } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
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
		}),
	)
	.get("/", ({ redirect }) => redirect(path));
