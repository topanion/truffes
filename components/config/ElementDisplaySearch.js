import React from "react";
import { useRouter } from "next/router";

export const ElementDisplaySearch = {
	animals: AnimalDisplaySearch,
	family: FamilyDisplaySearch,
};

function AnimalDisplaySearch(animal, router) {
	return (
		<div onClick={() => router.push("animaux/" + animal.id)}>
			<p>
				{animal.nom}
				<span className="text-2xl">{animal.sexe === 1 ? "♂" : "♀"}</span>{" "}
			</p>
			<p>{animal.espece}</p>
		</div>
	);
}

function FamilyDisplaySearch(family, router) {
	return (
		<div onClick={() => router.push("familles/" + family.id)}>
			<p>
				{family.nom} {family.prenom}
				<br />
				{family.departement} {family.ville}
			</p>
		</div>
	);
}
