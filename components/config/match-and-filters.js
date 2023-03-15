//
// Config for searchbar matching elements

const familySearchCategory = ["nom", "prenom", "ville", "departement"];

const animalSearchCategory = ["nom", "espece"];

export const SearchMatches = {
	family: familySearchCategory,
	animals: animalSearchCategory,
};

//
// Config for the filter buttons matching

const familyFilters = [
	{
		label: "Dispo",
		needed: (e) => {
			return e.dispo === true;
		},
	},
	{
		label: "Indisponible",
		needed: (e) => {
			return e.dispo === false;
		},
	},
];

const animalFilters = [
	{
		label: "En soin",
		needed: (e) => {
			return e.statut === 0;
		},
	},
	{
		label: "A l'adoption",
		needed: (e) => {
			return e.statut === 1;
		},
	},
	{
		label: "Adopté-e",
		needed: (e) => {
			return e.statut === 2;
		},
	},
	{
		label: "Réservé-e",
		needed: (e) => {
			return e.statut === 3;
		},
	},
];

export const SearchFilter = {
	family: familyFilters,
	animals: animalFilters,
};

export const SearchPlaceholder = {
	family: "Cherchez une famille par prénom, nom, ville, département...",
	animals: "Cherchez un animal par nom ou espèce",
};
