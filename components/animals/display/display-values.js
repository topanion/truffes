// GENERAL

export const animal_status = [
	"En soin",
	"A l'adoption",
	"Adopté-e",
	"Réservé-e",
];

export const animal_status_color = ["", "bg-red-800/50", "bg-green-700/50"];

// VET

export const allVet = [
	{ name: "Primo-vaccination", status: "primo", date: "date_primo" },
	{ name: "Rappel vaccin", status: "rappel", date: "date_rappel" },
	{ name: "Sterilisation", status: "steri", date: "date_steri" },
	{
		name: "Test FIV/FELV",
		status: "fiv_felv",
		date: "date_fiv_felv",
	},
	{
		name: "Anti-parasitaire",
		status: "anti_para",
		date: "date_anti_para",
	},
];

export const vet_status = ["Fait", "En cours", "Pas encore"];
export const vet_color = [
	"bg-green-700/50",
	"bg-green-700/10",
	"bg-red-800/50",
];

// ADMIN

export const allAdmin = [
	{ name: "Pré-Visite", status: "pre_visite" },
	{ name: "Mise en contact", status: "mise_en_contact" },
	{ name: "Contrat envoyé", status: "contrat_envoye" },
	{ name: "Contrat reçu", status: "contrat_recu" },
	{ name: "Feu vert", status: "feu_vert" },
];

export const admin_bool_color = {
	false: "bg-red-800/50",
	true: "bg-green-700/50",
};
