import React from "react";
import { userService } from "services/user-service";

export default function InfoDiv(props) {
	return (
		<div className={`rounded border flex p-3 mb-2 ${props.addedClass}`}>
			<div className="m-auto text-center">{props.children}</div>
		</div>
	);
}
