import React, { useState } from "react";
import InfoDiv from "components/general/InfoDiv";
import { dataService } from "services/data-service";
import { userService } from "services/user-service";
import { useRouter } from "next/router";

export default function ModalAnimal({ animal, closeModal }) {
	const router = useRouter();

	return (
		<div className="absolute top-0 left-0 w-screen h-screen bg-gray-800/30">
			<div className="m-auto lg:w-[50vw] w-[80vw] mt-[10vh] rounded-xl bg-white text-center text-black px-[10vw] py-3">
				<h1 className=" text-2xl">Créer cet animal ?</h1>
				<div className=" grid lg:grid-cols-5 grid-cols-3 gap-3">
					<InfoDiv>
						{animal.nom}
						<br />
						{animal.date_naissance}
						{animal.sexe === 1 ? "♂" : "♀"} {animal.espece}
					</InfoDiv>
				</div>
				<div className="w-[100%] items-center text-white mb-3">
					<button
						onClick={() => {
							animal.historique = [
								{
									date: Date.now(),
									utilisateur: userService.getName(),
									label: "creation",
								},
							];
							dataService.AddNewAnimal(animal).then((e) => {
								console.log(e[0]);
								router.push("/animaux/" + e[0].id);
							});
						}}
						className="rounded-xl border p-2 mr-5 bg-green-400  hover:bg-green-700 hover:cursor-pointer"
					>
						Oui
					</button>
					<button
						className="rounded-xl border p-2 bg-red-500 hover:bg-red-800 hover:cursor-pointer"
						onClick={() => closeModal()}
					>
						Non
					</button>
				</div>
			</div>
		</div>
	);
}
