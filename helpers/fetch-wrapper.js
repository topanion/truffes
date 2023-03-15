import getConfig from "next/config";
import { userService } from "services/user-service";
const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete,
};

/*
// Parameters for fetchWrapper to simplify fetch use
*/

function get(url) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(url),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		credentials: "include",
		body: JSON.stringify(body),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json", ...authHeader(url) },
		body: JSON.stringify(body),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
	const requestOptions = {
		method: "DELETE",
		headers: authHeader(url),
	};
	return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function authHeader(url) {
	// Get user from local storage ; have to replace later with a userservice function that will give its value
	const user = JSON.parse(localStorage.getItem("user"));
	//const user = userService.user;
	// Check if user and the token both exist
	const isLoggedIn = user && user.token;
	// check if the url is to the right api
	const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

	if (isLoggedIn && isApiUrl) {
		return { Authorization: `Bearer ${user.token}` };
	} else {
		// if wrong, return nothing
		return {};
	}
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		// if the response is not ok, sends a promise.reject (throw)
		// promise.reject can be used like throw but
		// Any time you are inside of a promise callback, you can use throw. However, if you're in any other asynchronous callback, you must use reject.
		if (!response.ok) {
			// checkes if the response are error 401/403 and if there's a user to log him out
			if ([401, 403].includes(response.status) && userService.user) {
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				userService.logout();
			}

			// returns a promise

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
