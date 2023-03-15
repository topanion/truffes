import Navbar from "components/general/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import SearchBar from "components/general/Searchbar";
import FilterCheck from "components/general/FilterCheck";
import {
	animal_status,
	animal_status_color,
} from "components/animals/display/display-values";

export default function Animals() {
	// all animals
	const [animals, setAnimals] = useState(null);
	// list after searching
	const [isLoaded, setIsLoaded] = useState(false);
	const [filtered, setFiltered] = useState(null);
	// content of the searchbar to be stored
	const [searchbar, setSearchbar] = useState(null);
	// set filtering buttons
	const [checked, setChecked] = useState(
		animal_status.map((e) => {
			return { name: e, checked: true };
		})
	);

	// other needed consts
	const router = useRouter();

	useEffect(() => {
		dataService
			.getFromDatabase("animals")
			.then((x) => {
				setAnimals(x);
				setIsLoaded(true);
			})
			.catch((err) => {
				if (err === "Invalid Token") {
					userService.logout();
					router.push("/login");
				} else {
					console.log("erreur");
				}
			});
	}, []);

	// For filter buttons to function
	function setThisChecked(index) {
		var tmp = [...checked];
		tmp[index].checked = !tmp[index].checked;
		setChecked(tmp);
		setResults();
	}

	// verify if there's a match to the filter, function has to be changed if other parameters have to be possibly filtered
	function checkMatch(input) {
		var match = false;

		checked.map((e, index) => {
			if (e.checked && input.statut === index) match = true;
		});

		return match;
	}

	// setResults : if input does not exist, it's being called by checked value, otherwise it comes from searchbar
	function setResults(input) {
		if (input && input.length < 2) {
			setSearchbar(null);
			setFiltered(null);
			return;
		}

		if (!input && searchbar) {
			var tmp = [...animals].filter((el) => {
				if (searchbar && checkMatch(el)) {
					return (
						el.nom.toLowerCase().includes(searchbar) ||
						el.espece.toLowerCase().includes(searchbar)
					);
				} else return false;
			});
		} else if (!input && !searchbar) {
			setFiltered(null);
		} else {
			setSearchbar(input);
			var tmp = [...animals].filter((el) => {
				if (checkMatch(el)) {
					return (
						el.nom.toLowerCase().includes(input) ||
						el.espece.toLowerCase().includes(input)
					);
				} else return false;
			});
		}

		setFiltered(tmp);
	}

	return (
		<>
			<div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col">
				{!isLoaded && <div className="spinner-border spinner-border-sm"></div>}
				{isLoaded && (
					<div>
						<div className="fixed top-[10vh] flex w-screen">
							<div className="m-auto lg:w-[50%] w-[90%] text-center">
								<SearchBar
									setSearch={(e) => setResults(e)}
									placeholder={"Rechercher un animal par nom ou type..."}
								/>
							</div>
						</div>
						<div className="lg:w-[50%] w-[90%] pt-[14vh] m-auto">
							<FilterCheck values={checked} setThisChecked={setThisChecked} />
						</div>
						<div className="m-auto h-[70vh] w-screen bg-gray-900 text-white pt-[5vh] lg:px-[10vw] px-[5vw]">
							{animals &&
								filtered &&
								filtered.length > 0 &&
								typeof animals === "object" && (
									<ul className="text-center grid lg:grid-cols-4 grid-cols-2 gap-6">
										{filtered.map((animal) => (
											<li
												onClick={() => router.push("/animaux/" + animal.id)}
												className={`border border-white rounded-xl p-3 hover:scale-105 hover:cursor-pointer ${
													animal_status_color[animal.statut]
												} flex`}
												key={animal.id}
											>
												<div className="m-auto">
													<p>
														{animal.nom}
														<span className="text-2xl">
															{animal.sexe === 1 ? "♂" : "♀"}
														</span>{" "}
													</p>
													<p>{animal.espece}</p>
												</div>
											</li>
										))}
									</ul>
								)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
