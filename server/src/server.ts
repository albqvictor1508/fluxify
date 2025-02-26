import { Elysia, t } from "elysia";
import { loadRoutes } from "./utils/load-routes";
import swagger from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import { env } from "./utils/env";
import { cors } from "@elysiajs/cors";
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

export const app = new Elysia({ name: "Fluxify" })
	.decorate("prisma", new PrismaClient({ log: ["warn", "error", "query"] }))
	.decorate("redis", new Redis(env.REDIS_URL))
	.use(
		swagger({
			path: "/docs",
			documentation: { info: { title: "Fluxify", version: "0.0.1" } },
			autoDarkMode: true,
		}),
	)
	.use(
		jwt({
			name: "jwt",
			schema: t.Object({
				id: t.String(),
				email: t.String({ format: "email" }),
			}),
			secret: env.JWT_SECRET,
			exp: "1d",
		}),
	)
	.use(
		cors({
			origin: "*",
		}),
	)
	.derive(
		async ({ path, headers: { authorization: auth }, jwt, cookie, error }) => {
			const AUTH_ROUTES = [
				"/api/auth/new",
				"/api/auth/login",
				"/api/test/email",
			];

			if (AUTH_ROUTES.includes(path)) return { user: { id: "", email: "" } };

			const token = auth ?? cookie.snickers_store_auth.value;
			const user = await jwt.verify(token);

			if (!token) return error("Unauthorized", "faltando o jwt seu bosseta");
			if (!user) return error("Unauthorized", "jwt errado seu msr");

			return { user }; //retornando o jwt verificado
		},
	);

await loadRoutes();

app.listen(3000, () => {
	console.log("HTTP Server running!");
});
