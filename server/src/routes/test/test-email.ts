import type { app } from "../../server";
import { handleSendEmail } from "../../services/nodemailer";

export const route = (elysia: typeof app) => {
	elysia.get("/api/test/email", async () => {
		handleSendEmail({
			email: "victorarruda460@gmail.com",
			subject: "testando email",
		});

		return { success: true };
	});
};
