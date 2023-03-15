import React from "react";
import SearchDiv from "components/general/SearchDiv";

export default function Animals() {
	return (
		<div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col">
			<div>
				<div className="fixed top-[10vh] flex w-screen">
					<SearchDiv category="animals" />
				</div>
			</div>
		</div>
	);
}
