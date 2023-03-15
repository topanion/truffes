import React, { useState } from "react";
import { dataService } from "services/data-service";
import { useForm } from "react-hook-form";
import FamilyModalSearch from "components/family/FamilyModalSearch";
import VetModalSearch from "components/vets/VetModalSearch";
import ModalAnimal from "./form/ModalAnimal";
import { FormInput } from "components/general/form/FormInput";
import { formInputHelper } from "./animal-form-options";

export function FormVet({ label, register, register_date, watch }) {
	return (
		<div className="text-center text-sm rounded-xl p-2">
			<span className="text-white">{label} :</span>
			{register ? (
				<FormInput
					type="select"
					options={[
						{ value: 2, text: "Pas fait" },
						{ value: 0, text: "Fait" },
						{ value: 1, text: "En cours" },
					]}
					register={register}
				/>
			) : (
				<br />
			)}
			{watch < 2 && (
				<input
					className="p-1 pb-3 rounded"
					type="datetime-local"
					{...register_date()}
				/>
			)}
		</div>
	);
}

export default function AnimalCreation() {
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const watchStatus = watch("statut");
	const watchAll = watch();
	const [animal, setAnimal] = useState({});
	const onSubmit = (data) => {
		setAnimal(data);
		setConfirmOpen(true);
	};

	const [family, setFamily] = useState(null);
	const [vet, setVet] = useState(null);

	const [confirmOpen, setConfirmOpen] = useState(false);

	return (
		<>
			{confirmOpen && (
				<ModalAnimal closeModal={() => setConfirmOpen(false)} animal={animal} />
			)}
			<div className=" w-[100%] rounded-xl p-6">
				<form className="" onSubmit={handleSubmit(onSubmit)}>
					{/************************************************************************************************************************************************
					 ** Informations Générales
					 *************************************************************************************************************************************************/}
					<h1>Informations Générales</h1>
					<div className="container w-full grid lg:grid-cols-4  md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 text-black items-center mb-5 border border-white/20 p-3 rounded-xl">
						<FormInput
							key="nom_animal"
							label="Nom"
							type="input"
							register={() => register("nom")}
							placeholder="Nom de l'animal"
						/>
						<FormInput
							label="Espèce"
							key="espece"
							type="text"
							register={() => register("espece")}
							placeholder="Espèce (et race)"
						/>
						<FormInput
							label="Provenance"
							key="provenance"
							type="text"
							register={() => register("provenance")}
							placeholder="Provenance de l'animal"
						/>
						<FormInput
							label="Sexe"
							key="sexe"
							type="select"
							register={() => register("sexe")}
							options={[
								{ value: 0, text: "Sexe" },
								{ value: 1, text: "Mâle" },
								{ value: 2, text: "Femelle" },
							]}
						/>
						<FormInput
							key="statut"
							label="Statut actuel"
							type="select"
							register={() => register("statut")}
							options={[
								{ value: 0, text: "En Soin" },
								{ value: 1, text: "A l'adoption" },
								{ value: 2, text: "Adopté-e" },
								{ value: 3, text: "Réservé-e" },
							]}
						/>
						{watchStatus > 1 && (
							<FamilyModalSearch
								parentIdCall={(e) => {
									setFamily(e), setValue("id_famille", e ? e.id : null);
								}}
								familyChosen={family ? family.prenom + " " + family.nom : null}
							/>
						)}
						<FormInput
							key="naissance"
							type="date"
							label="Date de naissance"
							register={() => register("date_naissance")}
						/>
					</div>

					{/************************************************************************************************************************************************
					 ** Informations vétérinaires
					 *************************************************************************************************************************************************/}
					<h1 className="mt-5">Informations pôle vétérinaire</h1>

					<div className="container w-full grid lg:grid-cols-4  md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 text-black items-center mb-5 border border-white/20 p-3 rounded-xl">
						<FormInput
							{...formInputHelper.primo}
							register={() => register("primo")}
						>
							<FormInput
								key="date_primo"
								register={() => register("date_primo")}
							/>
						</FormInput>
						<FormVet
							key="rappel"
							label="Rappel Vaccin"
							register={() => register("rappel")}
							register_date={() => register("date_rappel")}
							watch={watch("rappel")}
						/>
						<FormVet
							key="steri"
							label="Stérilisation"
							register={() => register("steri")}
							register_date={() => register("date_steri")}
							watch={watch("steri")}
						/>
						<FormVet
							key="testfiv"
							label="Tests FIV/FELV"
							register={() => register("fiv_felv")}
							register_date={() => register("date_fiv_felv")}
							watch={watch("fiv_felv")}
						/>
						<FormVet
							key="antipara"
							label="Anti-parasitaire"
							register={() => register("anti_para")}
							register_date={() => register("date_anti_para")}
							watch={watch("anti_para")}
						/>
						<FormInput
							label="Evenements de santé particuliers"
							key="event_sante"
							type="text"
							register={() => register("event_sante")}
							placeholder="Evenements sante"
						/>

						<VetModalSearch
							parentIdCall={(e) => {
								setVet(e), setValue("suivi_veto", e ? e.id : null);
							}}
							vetChosen={vet ? vet.nom : null}
						/>
					</div>

					{/************************************************************************************************************************************************
					 ** Informations Administration
					 *************************************************************************************************************************************************/}
					<h1 className="mt-5">Informations pôle Administration</h1>
					<div className="container w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 text-black items-center mb-5 border border-white/20 p-3 rounded-xl">
						<FormInput
							key="pre_visite"
							type="select"
							label="Pré-visite"
							register={() => register("pre_visite")}
							options={[
								{ value: false, text: "Pas faite" },
								{ value: true, text: "Faite" },
							]}
						/>

						<FormInput
							key="mise_contact"
							type="select"
							label="Mise en contact"
							register={() => register("mise_en_contact")}
							options={[
								{ value: false, text: "Pas faite" },
								{ value: true, text: "Faite" },
							]}
						/>
						<FormInput
							key="envoi"
							type="select"
							label="Contrat envoyé"
							register={() => register("contrat_envoye")}
							options={[
								{ value: false, text: "Pas fait" },
								{ value: true, text: "Fait" },
							]}
						/>
						<FormInput
							key="recu"
							type="select"
							label="Contrat reçu"
							register={() => register("contrat_recu")}
							options={[
								{ value: false, text: "Pas fait" },
								{ value: true, text: "Fait" },
							]}
						/>
						<FormInput
							key="feu_vert"
							type="select"
							label="Feu vert"
							register={() => register("feu_vert")}
							options={[
								{ value: false, text: "Non" },
								{ value: true, text: "Oui" },
							]}
						/>
						<FormInput
							key="photo_adoption"
							type="select"
							label="Photo adoption reçue"
							register={() => register("photo_adoption")}
							options={[
								{ value: false, text: "Pas reçue" },
								{ value: true, text: "Reçue" },
							]}
						/>
					</div>
					<button
						className=" mt-4 bg-gray-700 rounded-xl px-3 py-1 hover:bg-gray-600"
						type="submit"
					>
						Ajouter cet animal
					</button>
				</form>
			</div>
		</>
	);
}
