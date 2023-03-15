import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "helpers/fetch-wrapper";
import React, { createContext } from "react";

// get client runtime path (development so that'd be localhost:3000 rn)
const { publicRuntimeConfig } = getConfig();

// set a baseUrl as a path for userService to use for api calls in its functions
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

// see Rxjs later because i can't use LocalStorage during serverrendering and it sucks
// 14/12/2022 - let's see with context instead
// 14/12/2022 - same day but later yeah, never mind localstorage works just fine i'm just an idiot who forgot the table parameters names

export const userService = {
	getUser() {
		return JSON.parse(localStorage.getItem("user"));
	},
	getName() {
		var e = JSON.parse(localStorage.getItem("user"));
		return e.firstName + " " + e.lastName;
	},
	login,
	logout,
	getAll,
	role,
	isAdmin,
	isVet,
	isDev,
	roleCheck,
};

function login(username, password) {
	return fetchWrapper
		.post(`${baseUrl}/auth`, { username, password })
		.then((user) => {
			localStorage.setItem("user", JSON.stringify(user));
			return user;
		});
}

function logout() {
	// remove user from local storage, publish null to user subscribers and redirect to login page
	localStorage.removeItem("user");
	Router.push("/login");
}

function role() {
	const user = JSON.parse(localStorage.getItem("user"));
	return user.role;
}

function roleCheck(role) {
	const user = JSON.parse(localStorage.getItem("user"));

	return [...user.role].indexOf(role) > -1;
}

function isAdmin() {
	const user = JSON.parse(localStorage.getItem("user"));

	return [...user.role].indexOf("admin") > -1;
}

function isVet() {
	const user = JSON.parse(localStorage.getItem("user"));

	return [...user.role].indexOf("vet") > -1;
}

function isDev() {
	const user = JSON.parse(localStorage.getItem("user"));

	return [...user.role].indexOf("dev") > -1;
}

function getAll() {
	return fetchWrapper.get(baseUrl);
}
