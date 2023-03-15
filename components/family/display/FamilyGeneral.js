import InfoDiv from "components/general/InfoDiv";
import React from "react";

export default function FamilyGeneral(props) {
	return (
		<div className="w-fit rounded-xl border-2 p-6 m-auto">
			<div className="w-full text-center text-2xl mb-4">
				{props.prenom} {props.nom}
			</div>
			<div className="w-full grid lg:grid-cols-5 grid-cols-2 gap-2 mb-6 ">
				<InfoDiv>{props.dispo ? "Disponible" : "Prise"}</InfoDiv>
				<InfoDiv>
					<p>{props.adresse}</p>
					<p>
						{props.departement} {props.ville}
					</p>
				</InfoDiv>
				<InfoDiv>
					{props.mail && <p>Mail : {props.mail}</p>}
					<p>Téléphone : {props.telephone}</p>
				</InfoDiv>
				<InfoDiv>
					<p>Animaux souhaités :</p> {props.type}
				</InfoDiv>
				<InfoDiv>{props.vehicule ? "Véhiculé(e)" : "Non-véhiculé(e)"}</InfoDiv>
			</div>
		</div>
	);
}
