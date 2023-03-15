import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { userService } from "services/user-service";

export default function Login() {
	const router = useRouter();
	const [current, setCurrent] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		// redirect to home if already logged in
		if (!user) {
			setUser(JSON.parse(localStorage.getItem("user")));
			setCurrent(user);
			//user = JSON.parse(localStorage.getItem("user"));
		}
		if (user && user.token) {
			console.log("Already logged, directed to root");
			router.push("/");
		}
	}, [router, user, current]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget.elements;

		return userService
			.login(form.uname.value, form.pass.value)
			.then(() => {
				// get return url from query parameters or default to '/'
				const returnUrl = router.query.returnUrl || "/";
				router.push(returnUrl);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="h-screen w-screen flex">
			<form
				onSubmit={handleSubmit}
				className="lg:w-[50vw] w-[80vw] grid grid-cols-1 gap-3 m-auto bg-gray-900 text-white border-gray-200 rounded-xl  p-5"
			>
				<div className="w-full text-center">
					<label>
						<p className="pb-2">Nom d'utilisateur :</p>
					</label>
					<input
						className="rounded-xl px-3 py-1 text-black text-center"
						type="text"
						name="uname"
						required
					/>
				</div>
				<div className="w-full text-center">
					<label>
						<p className="pb-2">Mot de passe :</p>
					</label>
					<input
						className="rounded-xl px-3 py-1 text-black text-center"
						type="password"
						name="pass"
						required
					/>
				</div>
				<div className="mt-3 m-auto rounded-xl bg-white py-1 px-7 border-2 border-black text-center text-black hover:opacity-75">
					<button type="submit">Se connecter</button>
				</div>
			</form>
		</div>
	);
}
