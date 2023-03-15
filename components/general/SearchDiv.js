import React, { useState, useEffect } from "react";
import { dataService, searchService } from "services";
import SearchBar from "components/general/Searchbar";
import { useRouter } from "next/router";
import { ElementDisplaySearch } from "components/config/ElementDisplaySearch";
import FilterCheck from "./FilterCheck";
import {
	SearchFilter,
	SearchPlaceholder,
	SearchMatches,
} from "../config/match-and-filters";

export default function SearchDiv({ category }) {
	// content is the full list of elements of the table
	const [content, setContent] = useState(null);
	// set the filtering buttons
	const [filters, setFilters] = useState(
		SearchFilter[category].map((e) => {
			return {
				name: e.label,
				needed: e.needed,
				checked: true,
			};
		})
	);
	// filtered are the displayed ones
	const [filtered, setFiltered] = useState(null);
	// keeping last searched
	const [lastFound, setLastFound] = useState(null);
	const router = useRouter();

	useEffect(() => {
		dataService
			.getFromDatabase(category)
			.then((x) => {
				setContent(x);
			})
			.catch((err) => {
				if (err === "Invalid Token") {
					userService.logout();
					router.push("/login");
				} else {
					console.log(err);
				}
			});
	}, [router, category]);

	function setThisChecked(index) {
		var tmp = [...filters];
		tmp[index].checked = !tmp[index].checked;

		var output = searchService.matchFilters(lastFound, tmp);
		setFilters(tmp);
		setFiltered(output);
	}

	function setResults(input) {
		if (input === "" || input.length < 2) {
			setFiltered(null);
			return;
		}

		var tmp = searchService.filterSearch(
			content,
			SearchMatches[category],
			input
		);
		tmp = searchService.matchFilters(tmp, filters);
		setLastFound(tmp);
		setFiltered(tmp);
	}

	return (
		<>
			<div className="m-auto min-h-screen lg:w-[70vw] w-[85vw] h-[60vh] rounded-xl p-3">
				<SearchBar
					setSearch={(e) => setResults(e)}
					placeholder={SearchPlaceholder[category]}
				/>
				<FilterCheck values={filters} setThisChecked={setThisChecked} />
				<ul className="pt-2 text-center grid lg:grid-cols-4 grid-cols-2 gap-6">
					{filtered &&
						filtered.map((e) => (
							<li
								className="border border-white rounded-xl p-3 hover:bg-gray-700 hover:cursor-pointer flex"
								key={e.id}
							>
								<div className="m-auto">
									{ElementDisplaySearch[category](e, router)}
								</div>
							</li>
						))}
				</ul>
			</div>
		</>
	);
}
