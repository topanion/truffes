import Navbar from "components/general/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import FamilyGeneral from "components/family/display/FamilyGeneral";
import Openable from "components/general/Openable";
import InfoDiv from "components/general/InfoDiv";

export default function Family() {
	const [family, setFamily] = useState(null);
	const [animals, setAnimals] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;
		dataService
			.getFromDatabase("family", router.query.id)
			.then((x) => {
				setFamily(x);
			})
			.catch((err) => {
				if (err === "Invalid Token") {
					userService.logout();
					router.push("/login");
				} else {
					alert(err);
					router.push("/familles");
				}
			});
	}, [router.isReady]);

	return (
		<>
			{family && (
				<div className="w-screen bg-gray-900 text-white flex flex-col">
					<div className="h-screen w-screen flex text-white">
						<div className="m-auto w-[80vw]">
							<div className="mt-[15vh] grid w-full gap-6 items-center">
								<FamilyGeneral {...family} />
								{animals && (
									<Openable name="Voir les animaux">
										{animals.map((e) => {
											console.log(e);
											return (
												<InfoDiv>
													{e.nom} {e.sexe === 1 ? "♂" : "♀"} {e.espece}
												</InfoDiv>
											);
										})}
									</Openable>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
