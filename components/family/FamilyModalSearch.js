import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import SearchBar from "components/general/Searchbar";

export default function FamilyModalSearch(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [families, setFamilies] = useState(null);
	const [filtered, setFiltered] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const router = useRouter();

	useEffect(() => {
		dataService
			.getFamily()
			.then((x) => {
				setFamilies(x);
				setFiltered(x);
				setIsLoaded(true);
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
			setFiltered(families);
			return;
		}

		var tmp = [...families].filter((el) => {
			if (el.dispo === true) {
				return (
					el.nom.toLowerCase().includes(input) ||
					el.prenom.toLowerCase().includes(input) ||
					el.ville.toLowerCase().includes(input) ||
					el.departement.toLowerCase().includes(input)
				);
			} else return false;
		});
		setFiltered(tmp);
	}

	return (
		<>
			{!isOpen && (
				<div className="flex">
					<div
						className="text-sm mx-auto px-2 py-1 rounded-xl bg-white w-fit hover:cursor-pointer hover:bg-gray-300"
						onClick={() => setIsOpen(true)}
					>
						{props.familyChosen
							? "Famille d'accueil : " + props.familyChosen
							: "Sélectionner une famille d'accueil"}
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
								props.parentIdCall(null);
								setIsOpen(false);
							}}
						>
							Pas de famille
						</button>
						<SearchBar
							setSearch={(e) => setResults(e)}
							placeholder={"Rechercher une famille par ville, departement..."}
						/>
						<ul className="pt-2 text-center grid lg:grid-cols-4 grid-cols-2 gap-6">
							{filtered &&
								filtered.map((family) => (
									<li
										onClick={() => {
											props.parentIdCall(family);
											setIsOpen(false);
										}}
										className="border border-white rounded-xl p-3 hover:bg-gray-700 hover:cursor-pointer flex"
										key={family.id}
									>
										<div className="m-auto">
											<p>
												{family.nom} {family.prenom}
												<br />
												{family.departement} {family.ville}
											</p>
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
