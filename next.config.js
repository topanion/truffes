/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	serverRuntimeConfig: {
		secret: "my favorite pokemon is lugia",
		supaUrl: "https://tjxijdmwqzvbijoushkm.supabase.co",
		supaKey:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeGlqZG13cXp2Ymlqb3VzaGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4NjAwMTksImV4cCI6MTk4NjQzNjAxOX0.5WVg2J43mHWgIwuaaOMGgo56JRn9SmzwWh3mgrQjH-w",
	},
	publicRuntimeConfig: {
		apiUrl:
			process.env.NODE_ENV === "development"
				? "https://truffes-9u6c.vercel.app/api" // development api
				: "http://localhost:3000/api", // production api,
	},
};

module.exports = nextConfig;
