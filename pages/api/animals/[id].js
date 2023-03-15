import { apiHandler } from "helpers/api";
import { supabase } from "services/api/supabase-client";

export default apiHandler(handler);

function handler(req, res) {
	switch (req.method) {
		case "GET": {
			if (req.query.id === "undefined") return getAllAnimals();
			else return getAnimal();
		}
		case "POST": {
			return createNewAnimal(req.body);
		}
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function createNewAnimal() {
		const { data, error } = await supabase
			.from("animaux")
			.insert(req.body)
			.select();
		if (error) {
			console.log("error is ");
			console.log(error);
			return res.status(error.code).json(error);
		}
		return res.status(200).json(data);
	}

	async function getAllAnimals() {
		const { data, error } = await supabase.from("animaux").select();

		return res.status(200).json(data);
	}

	async function getAnimal() {
		const { data, error } = await supabase
			.from("animaux")
			.select()
			.eq("id", req.query.id);
		if (!data[0]) return res.status(404).end();
		return res.status(200).json(data[0]);
	}
}
