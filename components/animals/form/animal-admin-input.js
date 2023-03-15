import { inputCondition, adminBoolOptions } from "./formOptions";

export const animalAdminInput = [
	{
		label: "Pré-visite",
		type: "select",
		options: adminBoolOptions,
		db_value: "pre_visite",
	},
	{
		label: "Mise en contact",
		type: "select",
		options: adminBoolOptions,
		db_value: "mise_en_contact",
	},
	{
		label: "Contrat envoyé",
		type: "select",
		options: adminBoolOptions,
		db_value: "contrat_envoye",
	},
	{
		label: "Contrat reçu",
		type: "select",
		options: adminBoolOptions,
		db_value: "contrat_recu",
	},
	{
		label: "Feu vert",
		type: "select",
		options: adminBoolOptions,
		db_value: "feu_vert",
	},
	{
		label: "Photo adoption reçue",
		type: "select",
		db_value: "photo_adoption",
		options: [
			{ value: false, text: "Pas reçue" },
			{ value: true, text: "Reçue" },
		],
	},
];
