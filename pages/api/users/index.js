import { apiHandler } from "helpers/api";
import { supabase } from "services/api/supabase-client";

// users in JSON file for simplicity, store in a db for production applications
//const users = require("data/users.json");

export default apiHandler(handler);

function handler(req, res) {
	switch (req.method) {
		case "GET":
			//return getUsers();
			return getUsersSupa();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getUsers() {
		// return users without passwords in the response
		const response = users.map((user) => {
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		});
		return res.status(200).json(response);
	}

	async function getUsersSupa() {
		const { data, error } = await supabase.from("tests").select();
		if (error) {
			return res.status(error.code).end("Nope");
		}
		return res.status(200).json(data);
	}
}
