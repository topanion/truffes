import { userService } from "services/user-service";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "components/general/Navbar";

export default function Home() {
	const [user] = useState(JSON.parse(localStorage.getItem("user")));
	const router = useRouter();

	useEffect(() => {
		if (!user || !user.token) {
			console.log("Not logged or Invalid Token");
			userService.logout();
			router.push("/login");
		}
	}, [user, router]);

	return (
		<>
			<Navbar />
			{user && (
				<div>
					<div className="h-screen w-screen bg-gray-900 text-white flex flex-col">
						<div className="w-[70vw] container m-auto items-center text-center text-2xl">
							<p>
								Bienvenue, <br /> {user.firstName} {user.lastName}
							</p>
							<div className="pt-8 w-full flex-col ">
								Rôles : [{" "}
								{user.role.map((e, index) => {
									return `${index > 0 ? " -" : ""} ${e}`;
								})}{" "}
								]
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
