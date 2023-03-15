import React, { useState, useEffect } from "react";
import { dataService, searchService } from "services";
import SearchBar from "components/general/Searchbar";
import { useRouter } from "next/router";
import { ElementDisplaySearch } from "components/config/ElementDisplaySearch";

export default function SearchModal({
	table,
	searchCategory,
	value_return_function,
	placeholder,
	wanted,
}) {
	const [isOpen, setIsOpen] = useState(false);
	// content is the full list of elements of the table
	const [content, setContent] = useState(null);
	// filtered are the displayed ones
	const [filtered, setFiltered] = useState(null);
	const router = useRouter();
	// the one selected, it needs to be stored to change the placeholder value because
	// register will (most of the time for this app use) not keep the whole object
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		dataService
			.getFromDatabase(table)
			.then((x) => {
				setContent(x);
				setFiltered(x);
			})
			.catch((err) => {
				if (err === "Invalid Token") {
					userService.logout();
					router.push("/login");
				} else {
					console.log(err);
				}
			});
	}, []);

	function setResults(input) {
		if (input === "" || input.length < 2) {
			setFiltered(content);
			return;
		}

		var tmp = searchService.filterSearch(content, searchCategory, input);
		setFiltered(tmp);
	}

	return (
		<>
			{!isOpen && (
				<div className="flex w-full text-center">
					<div onClick={() => setIsOpen(true)}>
						<div className="text-black p-1 rounded bg-white hover:bg-gray-300 hover:cursor-pointer">
							{!selected && placeholder}
							{selected && ElementDisplaySearch[table](selected)}
						</div>
					</div>
				</div>
			)}
			{isOpen && (
				<div className="absolute left-0 top-0 bg-gray-800/50 flex w-screen h-screen">
					<div className="m-auto w-[70vw] h-[60vh] bg-gray-200 rounded-xl p-3">
						<button
							className="rounded-xl bg-red-400 p-1 text-white mb-2 hover:bg-red-600"
							onClick={() => setIsOpen(false)}
						>
							Fermer
						</button>
						<button
							className="rounded-xl bg-red-400 p-1 text-white mb-2 ml-3 hover:bg-red-600"
							onClick={() => {
								setIsOpen(false);
							}}
						>
							Retirer valeur
						</button>
						<SearchBar
							setSearch={(e) => setResults(e)}
							placeholder={placeholder}
						/>
						<ul className="pt-2 text-center grid lg:grid-cols-4 grid-cols-2 gap-6">
							{filtered &&
								filtered.map((e) => (
									<li
										onClick={() => {
											setSelected(e);
											console.log(e[wanted]);
											value_return_function(e[wanted]);
											setIsOpen(false);
										}}
										className="border border-white rounded-xl p-3 hover:bg-gray-700 hover:cursor-pointer flex"
										key={e.id}
									>
										<div className="m-auto">
											{ElementDisplaySearch[table](e)}
										</div>
									</li>
								))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
}
