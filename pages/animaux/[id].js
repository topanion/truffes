import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import AnimalGeneral from "components/animals/display/AnimalGeneral";
import AnimalVet from "components/animals/display/AnimalVet";
import AnimalAdmin from "components/animals/display/AnimalAdmin";
import Openable from "components/general/Openable";

export default function Animal() {
	const [animal, setAnimal] = useState(null);
	const [family, setFamily] = useState(null);
	const [vet, setVet] = useState(null);
	const [vetUrgent, setVetUrgent] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;
		// set the animal in their state
		dataService
			.getFromDatabase("animals", router.query.id)
			.then((x) => {
				setAnimal(x);
				if (x.id_famille) {
					// set family if the animal is adopted
					dataService.getFromDatabase("family", x.id_famille).then((e) => {
						setFamily(e);
						// set the vets
						dataService.getVet(e.vet_ref).then((x) => setVet(x));
						dataService.getVet(e.vet_urgence).then((x) => setVetUrgent(x));
					});
				}
			})
			.catch((err) => {
				if (err === "Invalid Token") {
					userService.logout();
					router.push("/login");
				} else {
					alert(err);
					router.push("/animaux");
				}
			});
	}, [router, router.isReady]);

	return (
		<>
			{animal && (
				<div className="w-screen bg-gray-900 text-white flex flex-col">
					<div className="h-screen w-screen flex text-white">
						<div className="m-auto w-[80vw]">
							<div className="mt-[15vh] w-full grid lg:grid-cols-2 grid-cols-1 gap-6 items-center">
								<AnimalGeneral {...animal} family={family} />
								<div>
									{userService.isVet() && (
										<Openable name="Voir informations vétérinaires">
											<AnimalVet {...animal} vet={vet} vetUrgent={vetUrgent} />
										</Openable>
									)}
									{userService.isAdmin() && (
										<Openable name="Voir informations administratives">
											<AnimalAdmin {...animal} />
										</Openable>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
