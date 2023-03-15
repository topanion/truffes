import React from "react";
import InfoDiv from "components/general/InfoDiv";
import Comment from "components/general/Comment";
import { useRouter } from "next/router";
import { allVet, vet_status, vet_color } from "./display-values";

/*
 **	Display vet informations but only if user has "vet" role
 */

export default function AnimalVet(props) {
	const router = useRouter();
	// list of vet data types and their name in the database

	// create a const that holds the output of above data into display
	const output = allVet.map((e, index) => {
		return (
			<InfoDiv
				addedClass={`${vet_color[props[e.status]]} text-sm`}
				key={"info vet" + index}
			>
				<span className="whitespace-nowrap">
					{e.name} :<br /> {vet_status[props[e.status]]}
				</span>
				<br />
				{props[e.status] <= 1 && props[e.date]}
			</InfoDiv>
		);
	});

	return (
		<div className="w-full rounded-xl items-center">
			<div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-2 mb-2">
				<InfoDiv addedClass="text-sm">Provenance : {props.provenance}</InfoDiv>
				{output}
			</div>
			<div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-2 mb-2">
				<InfoDiv addedClass="text-sm">
					Evenements notables : {props.event_sante}
				</InfoDiv>
				{props.vet && (
					<InfoDiv addedClass="text-sm">
						<p className="whitespace-nowrap">Vétérinaire référent :</p>
						<p>{props.vet.nom}</p>
						<p>{props.vet.telephone}</p>
						<p>{props.vet.adresse}</p>
					</InfoDiv>
				)}
				{props.vetUrgent && (
					<InfoDiv addedClass="text-sm">
						<p>Vétérinaire d'urgence :</p>
						<p>{props.vetUrgent.nom}</p>
						<p>{props.vetUrgent.telephone}</p>
						<p>{props.vetUrgent.adresse}</p>
					</InfoDiv>
				)}
			</div>

			<Comment name="Commentaire Véto">{props.commentaire_veto}</Comment>
		</div>
	);
}
