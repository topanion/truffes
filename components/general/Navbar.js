import React, { useState } from "react";
import { userService } from "services/user-service";
import { useRouter } from "next/router";
import Link from "next/link";

function NavButton(props) {
	const router = useRouter();

	return (
		<a
			className={`${
				router.pathname.includes(props.link) && props.link != "/"
					? "bg-gray-600"
					: ""
			} rounded h-max py-2 hover:bg-gray-700 p-5 hover:cursor-pointer`}
			href={props.link}
		>
			<li className="flex items-center text-xs uppercase font-bold text-white ">
				{props.name}
			</li>
		</a>
	);
}

export default function Navbar() {
	const router = useRouter();

	const [navbarOpen, setNavbarOpen] = useState(false);

	if (router.pathname.includes("login")) return <></>;
	return (
		<>
			<nav className="fixed w-screen flex flex-wrap items-center justify-between px-2  bg-gray-900 mb-3 border-b z-10">
				<div className="w-[70vw] container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<Link
							className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
							href="/"
						>
							Truffes Sans Toit
						</Link>
						<button
							className={` text-white cursor-pointer text-xl leading-none rounded ${
								navbarOpen ? "bg-gray-700" : "bg-transparent"
							} block lg:hidden outline-none focus:outline-none`}
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							{!navbarOpen ? (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="white"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="white"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
					<div
						className={
							"lg:flex flex-grow items-center " +
							(navbarOpen ? " flex pb-2" : " hidden")
						}
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto gap-4">
							<NavButton name="Accueil" link="/" />
							<NavButton name="Animaux" link="/animaux" />
							<NavButton name="Familles" link="/familles" />
							<NavButton name="Vétérinaires" link="/veterinaires" />
							<button
								className="rounded h-max py-2 hover:bg-red-400 p-5 whitespace-nowrap"
								onClick={() => userService.logout()}
							>
								<p className="flex items-center text-xs uppercase font-bold text-white">
									Se déconnecter
								</p>
							</button>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
