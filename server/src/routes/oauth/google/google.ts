import type { app } from "../../../server";
import { google } from "googleapis";
import { env } from "../../../utils/env";

const oauth2Client = new google.auth.OAuth2(
	env.GOOGLE_PUBLIC_ID,
	env.GOOGLE_SECRET_ID,
	env.GOOGLE_REDIRECT_URL,
);

export const route = (elysia: typeof app) => {
	elysia.get("/api/oauth/google", async ({ redirect }) => {
		const authUrl = oauth2Client.generateAuthUrl({
			access_type: "offline",
			scope: [
				"https://googleapis.com/auth/userinfo.email",
				"https://googleapis.com/auth/userinfo.profile",
			],
		});

		redirect(authUrl);
	});
};
