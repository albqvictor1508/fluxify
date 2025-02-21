import type { app } from "../../../server";
import { google } from "googleapis";
import { env } from "../../../utils/env";

const oauth2Client = new google.auth.OAuth2(
	env.GOOGLE_PUBLIC_ID,
	env.GOOGLE_SECRET_ID,
	env.GOOGLE_REDIRECT_URL,
);

export const route = (elysia: typeof app) => {
	elysia.get("/api/oauth/google", async ({ cookie }) => {
		const people = google.people({ version: "v1", auth: oauth2Client });
	});
};
