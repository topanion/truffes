import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import FilterCheck from "components/general/FilterCheck";
import SearchBar from "components/general/Searchbar";

export default function Families() {
	const [families, setFamilies] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [filtered, setFiltered] = useState(null);
	const [searchbar, setSearchbar] = useState(null);
	const [checked, setChecked] = useState([
		{ name: "Dispo", checked: true, value: true },
		{ name: "Pas Dispo", checked: true, value: false },
	]);

	const router = useRouter();

	useEffect(() => {
		dataService
			.getFromDatabase("family")
			.then((x) => {
				setFamilies(x);
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

	function setThisChecked(index) {
		var tmp = [...checked];
		tmp[index].checked = !tmp[index].checked;
		setChecked(tmp);
		setResults();
	}

	function checkMatch(input) {
		var match = false;

		checked.map((e, index) => {
			if (e.checked && input.dispo === e.value) match = true;
		});

		return match;
	}

	function setResults(input) {
		if (input && (input === "" || input.length < 2)) {
			console.log("because here");
			setFiltered(null);
			return;
		}

		if (!input && searchbar) {
			var tmp = [...families].filter((el) => {
				if (searchbar && checkMatch(el)) {
					return (
						el.nom.toLowerCase().includes(searchbar) ||
						el.prenom.toLowerCase().includes(searchbar) ||
						el.ville.toLowerCase().includes(searchbar) ||
						el.departement.toLowerCase().includes(searchbar)
					);
				} else return false;
			});
		} else {
			setSearchbar(input);
			var tmp = [...families].filter((el) => {
				if (checkMatch(el)) {
					return (
						el.nom.toLowerCase().includes(input) ||
						el.prenom.toLowerCase().includes(input) ||
						el.ville.toLowerCase().includes(input) ||
						el.departement.toLowerCase().includes(input)
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
									placeholder={
										"Rechercher une famille par ville, departement..."
									}
								/>
							</div>
						</div>
						<div className="lg:w-[50%] w-[90%] pt-[14vh] m-auto">
							<FilterCheck values={checked} setThisChecked={setThisChecked} />
						</div>
						<div className="m-auto h-[70vh] w-screen bg-gray-900 text-white pt-[5vh] lg:px-[10vw] px-[5vw]">
							{families &&
								filtered &&
								filtered.length > 0 &&
								typeof families === "object" && (
									<ul className="text-center grid lg:grid-cols-4 grid-cols-2 gap-6">
										{filtered.map((family) => (
											<li
												onClick={() => router.push("/familles/" + family.id)}
												className="border border-white rounded-xl p-3 hover:bg-gray-700 hover:cursor-pointer flex"
												key={family.id}
											>
												<div className="m-auto">
													<p>
														{family.nom} {family.prenom}
														<br />
														{family.telephone}
														<br /> {family.adresse} <br />
														{family.departement} {family.ville}
													</p>
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
