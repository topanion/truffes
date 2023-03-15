import React, { useState } from "react";

export default function SearchBar({ setSearch, placeholder }) {
	let inputHandler = (e) => {
		var input = e.target.value.toLowerCase();
		setSearch(input);
	};

	return (
		<input
			className="bg-white text-black w-full rounded-xl p-2 text-center text-sm z-0"
			placeholder={placeholder}
			type="text"
			onChange={inputHandler}
			variant="outlined"
		/>
	);
}
