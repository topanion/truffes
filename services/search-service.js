export const searchService = {
	filterSearch,
	matchFilters,
};

// Objects being an array of objects, parameters an array of string
// (names of the parameters that have to match the input)

function filterSearch(objects, parameters, input) {
	//console.log(objects);
	var tmp = [...objects].filter((el) => {
		for (var e in parameters) {
			if (el[parameters[e]].toLowerCase().includes(input)) return true;
		}
		return false;
	});
	return tmp;
}

function matchFilters(objects, conditions) {
	console.log("receiving");
	console.log(objects);
	// will filter the current selected resulted and then apply the filters
	var tmp = [...objects].filter((el) => {
		for (var i of conditions) {
			if (i.checked && i.needed(el)) return true;
		}
		return false;
	});

	// returns the filtered array
	return tmp;
}
