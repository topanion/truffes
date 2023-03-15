import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FamilyModalSearch from "components/family/FamilyModalSearch";
import VetModalSearch from "components/vets/VetModalSearch";
import ModalAnimal from "./ModalAnimal";
import { FormInput } from "components/general/form/FormInput";
import { animalGeneralInput, animalVetInput, animalAdminInput } from ".";

export default function AnimalCreation() {
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [animal, setAnimal] = useState({});
	const onSubmit = (data) => {
		setAnimal(data);
		setConfirmOpen(true);
	};

	const [family, setFamily] = useState(null);
	const [vet, setVet] = useState(null);

	const [confirmOpen, setConfirmOpen] = useState(false);

	function inputList(input_conf, category) {
		return (
			<React.Fragment key={category}>
				{input_conf.map((e, index) => {
					return (
						<FormInput
							key={e.label + " " + index}
							{...e}
							register={register}
							watch={watch}
						/>
					);
				})}
			</React.Fragment>
		);
	}

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
						{inputList(animalGeneralInput, "general")}
					</div>

					{/************************************************************************************************************************************************
					 ** Informations vétérinaires
					 *************************************************************************************************************************************************/}
					<h1 className="mt-5">Informations pôle vétérinaire</h1>

					<div className="container w-full grid lg:grid-cols-4  md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2 text-black items-center mb-5 border border-white/20 p-3 rounded-xl">
						{inputList(animalVetInput, "vet")}
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
						{inputList(animalAdminInput, "admin")}
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
