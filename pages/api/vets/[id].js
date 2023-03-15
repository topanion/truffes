import { apiHandler } from "helpers/api";
import { supabase } from "services/api/supabase-client";

export default apiHandler(handler);

function handler(req, res) {
	switch (req.method) {
		case "GET": {
			if (req.query.id === "undefined") return getAllVets();
			else return getVet();
		}
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getAllVets() {
		const { data, error } = await supabase.from("veterinaires").select();
		return res.status(200).json(data);
	}

	async function getVet() {
		const { data, error } = await supabase
			.from("veterinaires")
			.select()
			.eq("id", req.query.id);
		if (!data[0]) return res.status(404).end();
		return res.status(200).json(data[0]);
	}
}
