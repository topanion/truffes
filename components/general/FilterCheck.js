import React, { useState, useEffect } from "react";

function FilterButton(props) {
	const [checked, setChecked] = useState(true);

	return (
		<div
			className={`${
				checked ? "bg-orange-700" : "bg-gray-700"
			} p-1 rounded-xl text-white text-sm hover:scale-105 hover:cursor-pointer`}
			onClick={() => {
				setChecked(!checked);
				props.setThisChecked(props.index);
			}}
		>
			{props.name}
		</div>
	);
}

export default function FilterCheck(props) {
	const buttons = props.values.map((e, index) => {
		return (
			<FilterButton
				name={e.name}
				key={index}
				index={index}
				setThisChecked={props.setThisChecked}
			/>
		);
	});

	return (
		<div className="mt-3 grid lg:grid-cols-5 grid-cols-3 gap-3 text-center">
			{buttons}
		</div>
	);
}
