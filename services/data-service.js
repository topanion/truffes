import getConfig from "next/config";
import { fetchWrapper } from "helpers/fetch-wrapper";

// get client runtime path (development so that'd be localhost:3000 rn)
const { publicRuntimeConfig } = getConfig();

// set a baseUrl as a path for userService to use for api calls in its functions
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const dataService = {
	getFromDatabase,
	getVet,
	AddNewAnimal,
};

function getFromDatabase(table, id) {
	return fetchWrapper.get(baseUrl + "/" + table + "/" + id);
}

function AddNewAnimal(input) {
	return fetchWrapper.post(baseUrl + "/animals/undefined", input);
}

function getVet(id) {
	return fetchWrapper.get(baseUrl + "/vets/" + id);
}
