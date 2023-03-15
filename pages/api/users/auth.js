// getConfig to get the secret
import getConfig from "next/config";
const jwt = require("jsonwebtoken");

// obtain serverruntime from next.config.js without a path
const { serverRuntimeConfig } = getConfig();

// gonna wrap the handler in apiHandler
import { apiHandler } from "helpers/api";
export default apiHandler(handler);

// require data from users.json but it might be interesting to call from another API later
const users = require("data/users.json");

function handler(req, res) {
	// Check that the method is POST ; it's an authentification system, it will only provide back an error message or a JWT
	switch (req.method) {
		case "POST":
			return authenticate();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function authenticate() {
		const { username, password } = req.body;
		const user = users.find(
			(u) => u.username === username && u.password === password
		);

		if (!user) throw "Username or password is incorrect";

		const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
			expiresIn: "12h",
		});
		console.log("given a token");
		// return basic user details and token
		return res.status(200).json({
			id: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
			token,
		});
	}
}
