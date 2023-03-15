import React, { useState } from "react";
import { FormInput } from "./form/FormInput";
import { useForm } from "react-hook-form";

export default function InputDiv(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [newValue, setNewValue] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	// basic infodiv

	const onSubmit = (data) => {
		console.log(data);
		setIsOpen(false);
	};

	if (props.mod) {
		return (
			<>
				{/* Modal opens if user wants to change the value
				 */}
				{isOpen && (
					<div className="absolute z-50 top-0 left-0 bg-black/50 flex w-screen h-screen">
						<form
							className=" m-auto bg-white rounded-xl p-10"
							onSubmit={handleSubmit(onSubmit)}
						>
							<button
								className="bg-red-500 hover:bg-red-800 rounded-xl p-2"
								onClick={() => setIsOpen(false)}
							>
								Fermer
							</button>
							<div className="mt-3 grid lg:grid-cols-2 grid-cols-1 gap-6 text-center text-black">
								{/* current value
								 */}
								<div className="border rounded-xl p-5">
									Valeur actuelle :<br /> {props.value}
								</div>
								<div className="border rounded-xl p-5">
									Nouvelle valeur : <br />
									<FormInput
										key={props.label.label}
										{...props.label}
										register={register}
									/>
								</div>
							</div>

							<button
								type="submit"
								className={`${
									watch(props.label.label) ? "hidden" : ""
								} hover:cursor-pointer hover:scale-105 mt-2 w-fit rounded-xl p-2 bg-blue-300`}
							>
								Modifier la valeur
							</button>
						</form>
					</div>
				)}

				<div
					className={`rounded border flex p-3 mb-2 ${props.addedClass} hover:scale-105 hover:cursor-pointer`}
					onClick={() => setIsOpen(true)}
				>
					<div className="m-auto text-center">{props.children}</div>
				</div>
			</>
		);
	}

	return (
		<div className={`rounded border flex p-3 mb-2 ${props.addedClass}`}>
			<div className="m-auto text-center">{props.children}</div>
		</div>
	);
}
