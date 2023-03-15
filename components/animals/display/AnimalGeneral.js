import InfoDiv from "components/general/InfoDiv";
import React from "react";
import Comment from "components/general/Comment";
import { useRouter } from "next/router";
import InputDiv from "components/general/InputDiv";
import { animal_status } from "./display-values";
import { useState } from "react";
import { userService } from "services";
import { animalGeneralInput } from "../form";

export default function AnimalGeneral(props) {
	const router = useRouter();
	const [mod, setMod] = useState(false);

	return (
		<div className={`w-full rounded-xl border-2 p-6`}>
			{/*
			Button that only appears with correct role to allow modifications
			*/}
			<div
				className={`${
					userService.roleCheck("admin") ? "" : "hidden"
				} rounded-xl w-fit ${
					mod ? "bg-red-800" : "bg-green-800"
				} text-sm p-2 hover:cursor-pointer hover:scale-105`}
				onClick={() => setMod(!mod)}
			>
				{mod ? "Arrêter les modifications" : "Modifier"}
			</div>
			{/*
			////////////////////////////////
			*/}
			<div className="w-full text-center text-2xl mb-4">{props.nom}</div>
			<div className="w-full grid lg:grid-cols-3 grid-cols-2 gap-2 mb-6 ">
				<InputDiv
					value={props.date_naissance}
					mod={mod}
					label={animalGeneralInput.find(
						(e) => e.label === "Date de naissance"
					)}
				>
					Date de naissance : <br />
					{props.date_naissance}
				</InputDiv>

				<InfoDiv>
					{props.sexe === 1 ? "♂" : "♀"} {props.espece}
				</InfoDiv>
				{/*
				// If the animal is adopted / reserved
				 */}
				{props.statut == 2 && props.family && (
					<div
						className="hover:cursor-pointer hover:scale-105 transition transform duration-300"
						onClick={() => router.push("/familles/" + props.id_famille)}
					>
						<InfoDiv>
							Adopté{props.sexe === 1 ? "" : "e"} par {props.family.prenom}{" "}
							{props.family.nom}
							<br />
							{props.family.telephone}
						</InfoDiv>
					</div>
				)}
				{/*
				// If they are not adopted / reserved
				 */}
				{props.statut < 2 && <InfoDiv>{animal_status[props.statut]}</InfoDiv>}
			</div>
			<Comment name="Commentaire">{props.commentaire_veto}</Comment>
		</div>
	);
}
