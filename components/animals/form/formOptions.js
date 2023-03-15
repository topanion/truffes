export const vetOptions = [
	{ value: 0, text: "Pas fait" },
	{ value: 1, text: "Fait" },
	{ value: 2, text: "En cours" },
];

export const adminBoolOptions = [
	{ value: 0, text: "Pas fait" },
	{ value: 1, text: "Fait" },
];

export const sexOptions = [
	{ value: 1, text: "Mâle" },
	{ value: 2, text: "Femelle" },
];

export const adoptStatusOptions = [
	{ value: 0, text: "En Soin" },
	{ value: 1, text: "A l'adoption" },
	{ value: 2, text: "Adopté-e" },
	{ value: 3, text: "Réservé-e" },
];

export const inputCondition = (e) => {
	return e > 0;
};

export const familyChoiceCondition = (e) => {
	return e > 1;
};
