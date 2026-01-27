// Like @elysiajs/jwt, but with iat as a number (correctly, per RFC7519#section-4.1.6)

import { type Type, type } from "arktype";
import { Elysia } from "elysia";
import {
	type CryptoKey,
	type JWK as Jwk,
	type JWSHeaderParameters as JwsHeaderParameters,
	type JWTPayload as JwtPayload,
	jwtVerify,
	type KeyObject,
	SignJWT as SignJwt,
} from "jose";

type UnwrapSchema<
	Schema extends Type | undefined,
	Fallback = unknown,
> = Schema extends Type ? Schema["infer"] : Fallback;

const JwtPayloadSpec = type({
	"iss?": "string",
	"sub?": "string",
	"aud?": "string | string[]",
	"jti?": "string",
	"nbf?": "string | number",
	"exp?": "string | number",
	"iat?": "number", // See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
});

export type JwtPayloadSpec = typeof JwtPayloadSpec.infer;

export interface JwtOption<
	Name extends string | undefined = "jwt",
	Schema extends Type | undefined = undefined,
> extends JwsHeaderParameters,
		Omit<JwtPayload, "nbf" | "exp"> {
	/**
	 * Name to decorate method as
	 *
	 * ---
	 * @example
	 * For example, `jwt` will decorate Context with `Context.jwt`
	 *
	 * ```typescript
	 * app
	 *     .decorate({
	 *         name: 'myJWTNamespace',
	 *         secret: process.env.JWT_SECRETS
	 *     })
	 *     .get('/sign/:name', ({ myJWTNamespace, params }) => {
	 *         return myJWTNamespace.sign(params)
	 *     })
	 * ```
	 */
	name?: Name;
	/**
	 * JWT Secret
	 */
	secret: string | Uint8Array | CryptoKey | Jwk | KeyObject;
	/**
	 * Type strict validation for JWT payload
	 */
	schema?: Schema;

	/**
	 * JWT Not Before
	 *
	 * @see [RFC7519#section-4.1.5](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.5)
	 */

	nbf?: string | number;
	/**
	 * JWT Expiration Time
	 *
	 * @see [RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)
	 */
	exp?: string | number;
}

export const jwt = <
	const Name extends string = "jwt",
	const Schema extends Type | undefined = undefined,
>({
	name = "jwt" as Name,
	secret,
	// Start JWT Header
	alg = "HS256",
	crit,
	schema,
	// End JWT Header
	// Start JWT Payload
	nbf,
	exp,
	...payload
}: // End JWT Payload
JwtOption<Name, Schema>) => {
	if (!secret) throw new Error("Secret can't be empty");

	const key =
		typeof secret === "string" ? new TextEncoder().encode(secret) : secret;

	const validator = schema ? schema.and(JwtPayloadSpec) : undefined;

	return new Elysia({
		name: "ElysiaJS JWT plugin",
		seed: {
			name,
			secret,
			alg,
			crit,
			schema,
			nbf,
			exp,
			...payload,
		},
	}).decorate(name as Name extends string ? Name : "jwt", {
		sign(
			morePayload: UnwrapSchema<Schema, Record<string, string | number>> &
				Omit<JwtPayloadSpec, "exp" | "nbf"> & {
					exp?: string | number;
					nbf?: string | number;
				},
		) {
			const {
				exp: morePayloadExp,
				nbf: morePayloadNbf,
				...claimsMorePayload
			} = morePayload;

			let jwt = new SignJwt({
				...payload,
				...claimsMorePayload,
			}).setProtectedHeader({
				alg,
				crit,
			});

			if (morePayloadNbf !== undefined) {
				jwt = jwt.setNotBefore(morePayloadNbf);
			}

			if (morePayloadExp !== undefined) {
				jwt = jwt.setExpirationTime(morePayloadExp);
			}

			return jwt.sign(key);
		},
		async verify(
			jwt?: string,
		): Promise<
			| (UnwrapSchema<Schema, Record<string, string | number>> & JwtPayloadSpec)
			| false
		> {
			if (!jwt) return false;

			try {
				const data = (await jwtVerify(jwt, key)).payload;

				if (validator && !validator.allows(data)) return false;

				return data as UnwrapSchema<Schema, Record<string, string | number>> &
					JwtPayloadSpec;
			} catch (_) {
				return false;
			}
		},
	});
};
export default jwt;
