import { Redis } from "iovalkey";
import { env } from "./env";

export const createRedis = async () => {
	return new Redis({
		tls: env.REDIS_SSL === "true" ? {} : undefined,
		host: env.REDIS_HOST,
		password: env.REDIS_PASSWORD,
		port: Number(env.REDIS_PORT),
		db: 5,
	});
};
