import arkenv from "arkenv";

export default arkenv({
	DATABASE_URL: "string",
	PORT: "number.port = 3000",
	JWT_SECRET: "string",
	NODE_ENV: "'development' | 'production' | 'test' = 'development'",
	LOG_LEVEL: "'debug' | 'info' = 'info'",
});
