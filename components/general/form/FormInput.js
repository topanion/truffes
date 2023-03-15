import React from "react";
import SearchModal from "./SearchModal";
import { useForm } from "react-hook-form";

export function FormInput({
	// type of the input
	type,
	// options if select
	options,
	// register from parent component
	register,
	// basic informations
	placeholder,
	label,
	// condition for child to appear (for example if the select/bool value is 1)
	condition,
	// child (object with FormInput props as parameter)
	child,
	// db value to use for register
	db_value,
	// watch from parent component to check if db_value matches condition
	watch,

	// if the formInput is going to be a modal with a search function
	// table is the table name
	table,
	// list of parameters to be match with the entered input in the searchbar
	searchCategory,
	// if true, FormInput can be in more than one bracket
	open,
	// children from React Children
	children,
	// wanted
	wanted,
}) {
	const { setValue } = useForm();
	const output = [
		{
			type: "input",
			value: (
				<input
					placeholder={placeholder}
					className="text-black p-1"
					{...register(db_value)}
				/>
			),
		},
		{
			type: "text",
			value: (
				<input
					placeholder={placeholder}
					type="text"
					className="text-black p-1"
					{...register(db_value)}
				/>
			),
		},
		{
			type: "textarea",
			value: (
				<textarea
					placeholder={placeholder}
					type="text"
					className="text-black p-1"
					{...register(db_value)}
				/>
			),
		},
		{
			type: "date",
			value: (
				<input
					className="p-1 rounded"
					type="datetime-local"
					{...register(db_value)}
				/>
			),
		},
		{
			type: "select",
			value: (
				<select className="text-black p-1 rounded" {...register(db_value)}>
					{options &&
						options.map((e) => {
							return <option value={e.value}>{e.text}</option>;
						})}
				</select>
			),
		},
		{
			type: "modal",
			value: (
				<SearchModal
					table={table}
					searchCategory={searchCategory}
					value_return_function={(e) => setValue(db_value, e)}
					wanted={wanted}
					placeholder={placeholder}
				/>
			),
		},
	];

	return (
		<div
			key={label + " div child"}
			className="text-center items-center text-sm p-1"
		>
			{label && <div className="text-white">{label} :</div>}
			{output.map((e) => {
				return e.type === type ? e.value : null;
			})}
			{child && condition(watch(db_value)) && (
				<FormInput key={label + " child"} {...child} register={register} />
			)}
			{open && { children }}
		</div>
	);
}
