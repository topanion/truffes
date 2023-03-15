import Navbar from "components/general/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import AnimalCreation from "components/animals/form/AnimalCreation";
import SearchBar from "components/general/Searchbar";
import FamilyModalSearch from "components/family/FamilyModalSearch";

export default function AnimalsDev() {
	const router = useRouter();

	useEffect(() => {
		if (!userService.isDev()) router.push("/animaux");
	}, []);

	return (
		<>
			<div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col">
				<div className="m-auto mt-[8vh] w-[80vw] bg-gray-900 text-white">
					<AnimalCreation key="animal creation" />
				</div>
			</div>
		</>
	);
}
