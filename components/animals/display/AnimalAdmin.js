import React from "react";
import InfoDiv from "components/general/InfoDiv";
import Comment from "components/general/Comment";
import {
	allAdmin,
	admin_status,
	admin_status_color,
	admin_bool_color,
} from "./display-values";

export default function AnimalAdmin(props) {
	// create a const that holds the output of above data into display
	const output = allAdmin.map((e) => {
		return (
			<InfoDiv
				key={e.name}
				addedClass={`${admin_bool_color[props[e.status]]} text-sm`}
			>
				{e.name}
			</InfoDiv>
		);
	});

	return (
		<div className="w-full rounded-xl p-6">
			<div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-2 mb-2">
				{output}
			</div>
			<Comment name="Commentaire admin">{props.commentaire_veto}</Comment>
		</div>
	);
}
