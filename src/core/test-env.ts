import arkenv from "arkenv";

export default arkenv({
	APIURL: "string = 'http://localhost:3000/api'",
	USERNAME: "string = 'jake'",
	EMAIL: "string = 'jake@jake.jake'",
	PASSWORD: "string = 'hunter2A'",
	POSTMAN_COLLECTION:
		"string = 'https://raw.githubusercontent.com/gothinkster/realworld/refs/heads/main/api/Conduit.postman_collection.json'",
	SKIP_DB_RESET: "boolean = false",
	DELAY_REQUEST: "number = 50",
});
