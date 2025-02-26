import { cleanEnv, email, str, url } from "envalid";

export const env = cleanEnv(process.env, {
	// Database
	DATABASE_URL: url(),
	POSTGRES_USER: str(),
	POSTGRES_PASSWORD: str(),
	POSTGRES_DB: str(),

	//auth
	JWT_SECRET: str(),

	// E-mail (nodemailer)
	GMAIL_PORT: str(),
	MY_GMAIL: email(),
	MY_GMAIL_PASSWORD: str(),
	MAIL_HOST: str(),
	MAIL_SERVICE: str(),

	// Google (Oauth)
	GOOGLE_PUBLIC_ID: str(),
	GOOGLE_SECRET_ID: str(),
	GOOGLE_REDIRECT_URL: url(),

	// Redis
	REDIS_URL: url(),
});
