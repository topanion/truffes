import { animalSearchCategory } from "components/config/match-and-filters";
import {
	adoptStatusOptions,
	sexOptions,
	familyChoiceCondition,
} from "./formOptions";

export const animalGeneralInput = [
	{
		label: "Nom de l'animal",
		type: "input",
		db_value: "nom",
	},
	{
		label: "Sexe",
		type: "select",
		db_value: "sexe",
		options: sexOptions,
	},
	{
		label: "Espèce",
		type: "text",
		db_value: "espece",
	},
	{
		label: "Provenance",
		type: "text",
		db_value: "provenance",
	},
	{
		label: "Statut d'adoption",
		type: "select",
		db_value: "statut",
		options: adoptStatusOptions,
		condition: familyChoiceCondition,
		child: {
			type: "modal",
			db_value: "id_famille",
			wanted: "id",
			table: "family",
			searchCategory: animalSearchCategory,
			placeholder: "Choisir une famille d'accueil",
		},
	},
	{
		label: "Date de naissance",
		type: "date",
		db_value: "date_naissance",
	},
];
