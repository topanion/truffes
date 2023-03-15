import React, { useState } from "react";

export default function Comment(props) {
	const [opened, setOpened] = useState(false);

	return (
		<>
			<div
				className="w-fit bg-gray-600/50 rounded-xl p-2 text-center text-sm hover:bg-gray-300/50 hover:cursor-pointer"
				onClick={() => {
					setOpened(!opened);
				}}
			>
				{!opened && <p className="text-xs">{props.name}</p>}
				{opened && <>{props.children}</>}
			</div>
		</>
	);
}
