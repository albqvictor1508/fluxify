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

	elysia.get("/api/oauth/google/callback", async ({ query, error }) => {
		const code = query.code;
		if (!code) {
			error("Bad Request", "Authorization code not provided");
		}

		try {
			const { tokens } = await oauth2Client.getToken(code);
			oauth2Client.setCredentials(tokens);

			return { success: true };
		} catch (e) {
			console.debug(e);
			error("Internal Server Error", `Error in Auth ${e}`);
		}
	});
};
