import { inputCondition, vetOptions } from "./formOptions";

export const animalVetInput = [
	{
		label: "Primo-vaccination",
		type: "select",
		options: vetOptions,
		db_value: "primo",
		condition: inputCondition,
		child: {
			type: "date",
			db_value: "date_primo",
		},
	},
	{
		label: "Rappel vaccin",
		type: "select",
		options: vetOptions,
		db_value: "rappel",
		condition: inputCondition,
		child: {
			type: "date",
			db_value: "date_rappel",
		},
	},
	{
		label: "Stérilisation",
		type: "select",
		options: vetOptions,
		db_value: "steri",
		condition: inputCondition,
		child: {
			type: "date",
			db_value: "date_steri",
		},
	},
	{
		label: "Tests FIV/FELV",
		type: "select",
		options: vetOptions,
		db_value: "fiv_felv",
		condition: inputCondition,
		child: {
			type: "date",
			db_value: "date_fiv_felv",
		},
	},
	{
		label: "Anti-parasitaire",
		type: "select",
		options: vetOptions,
		db_value: "anti_para",
		condition: inputCondition,
		child: {
			type: "date",
			db_value: "date_anti_para",
		},
	},
	{
		label: "Evenements de sante particulier",
		type: "textarea",
		db_value: "event_sante",
	},
];
