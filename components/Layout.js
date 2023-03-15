import Navbar from "./general/Navbar";

export default function Layout({ children }) {
	return (
		<>
			<main>
				<Navbar />
				{children}
			</main>
		</>
	);
}
