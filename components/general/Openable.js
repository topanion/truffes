import React, { useState, useEffect } from "react";

export default function Openable(props) {
	const [opened, setOpened] = useState(false);

	useEffect(() => {}, [opened]);

	return (
		<>
			<div
				className={` ${
					opened
						? ""
						: "p-2 hover:cursor-pointer bg-gray-600/50 hover:bg-gray-800/50"
				} rounded-xl text-center text-sm mt-2`}
			>
				{!opened && (
					<div
						onClick={() => {
							setOpened(true);
						}}
					>
						<p className="">{props.name}</p>
					</div>
				)}
				{opened && (
					<>
						<div
							className="mb-3 rounded-xl p-2 px-4 hover:cursor-pointer bg-gray-600/50 hover:bg-gray-800/50"
							onClick={() => {
								setOpened(false);
							}}
						>
							Fermer
						</div>
						{props.children}
					</>
				)}
			</div>
		</>
	);
}
