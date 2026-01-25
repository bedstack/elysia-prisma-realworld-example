import chalk from "chalk";
import { app } from "@/core/app";
import { env } from "@/core/env";

console.info(chalk.gray("Starting server"));

app.listen(env.PORT, ({ hostname, port }) => {
	console.info(
		`Server is running on ${chalk.blue(`http://${hostname}:${port}`)}`,
	);
});
