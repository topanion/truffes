import "styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "components/Layout";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		// check if user is logged
		authCheck(router.asPath);

		// set authorized to false to hide page content while changing routes
		const hideContent = () => setAuthorized(false);
		router.events.on("routeChangeStart", hideContent);

		// run auth check on route change
		router.events.on("routeChangeComplete", authCheck);

		// unsubscribe from events in useEffect return function
		return () => {
			router.events.off("routeChangeStart", hideContent);
			router.events.off("routeChangeComplete", authCheck);
		};
	}, []);

	// redirect to login page if accessing a private page and not logged in
	function authCheck(url) {
		const user = localStorage.getItem("user");
		const publicPaths = ["/login"];
		// check if path = /login (+ potential login request that failed)
		const path = url.split("?")[0];
		// if user is not connected and the user is indeed doing something else than login
		if (!user && !publicPaths.includes(path)) {
			setAuthorized(false);
			console.log("redirected to login");
			router.push({
				// go to login page
				pathname: "/login",
				query: { returnUrl: router.asPath },
			});
		} else {
			setAuthorized(true);
		}
	}

	return (
		<div>
			{" "}
			{authorized && (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</div>
	);
}

export default MyApp;
