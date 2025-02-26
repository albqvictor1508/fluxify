import { PrismaClient } from "@prisma/client";
import { env } from "../env";
import {
	type AutoCacheConfig,
	type CacheConfig,
	CacheCase,
	PrismaExtensionRedis,
} from "prisma-extension-redis";

const prismaClient = new PrismaClient({
	log: ["warn", "error", "info", "query"],
});

const redisClient = {
	tls: env.REDIS_SSL === "true" ? {} : undefined, //com TLS ligado, tudo que é encaminhado pro cache do redis vai criptografado
	host: env.REDIS_HOST,
	password: env.REDIS_PASSWORD,
	port: Number(env.REDIS_PORT),
};

const auto: AutoCacheConfig = {
	excludedModels: [],
	excludedOperations: [],
	models: [
		//model -> model que vai auto cachear quando fizer as queries
		//excludedOperations -> excluir operações pra que essa operação não seja cacheada
		//ttl -> time to leave = o tempo que o cache vai se manter
		//stale -> entendi mto n
	],
	ttl: 60, //mudar isso dps
	stale: 0,
};

const config: CacheConfig = {};

export const createPrisma = async () => {};
