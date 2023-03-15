export function FormInput({
	children,
	type,
	options,
	register,
	placeholder,
	label,
}) {
	const output = [
		{
			type: "input",
			value: (
				<input
					placeholder={placeholder}
					className="text-black p-1"
					{...register()}
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
					{...register()}
				/>
			),
		},
		{
			type: "date",
			value: (
				<input className="p-1 rounded" type="datetime-local" {...register()} />
			),
		},
		{
			type: "select",
			value: (
				<select className="text-black p-1 rounded" {...register()}>
					{options &&
						options.map((e, index) => {
							return (
								<option key={index} value={e.value}>
									{e.text}
								</option>
							);
						})}
				</select>
			),
		},
	];

	return (
		<div className="text-center text-sm p-1">
			{label && <div className="text-white">{label} :</div>}
			{output.map((e) => {
				return e.type === type ? e.value : null;
			})}
			{children}
		</div>
	);
}
