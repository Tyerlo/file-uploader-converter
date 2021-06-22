import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import Footer from "./footer";
import InputRuc from "../components/InputRuc";
const RegisterRuc = () => {
	const [planRuc, setPlanRuc] = useState([]);
	const [user, loading, error] = useAuthState(firebase);

	useEffect(() => {
		//Get the subscription from database
		if (user) {
			firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.collection("subscriptions")
				.where("status", "in", ["active"])
				.onSnapshot(async (snapshot) => {
					// In this implementation we only expect one active or trialing subscription to exist.
					const doc = snapshot.docs[0];

					setPlanRuc(doc.data());
				});
		}
	}, [user]);

	return (
		<div>
			<header className="header">
				<div className="header__text-box">
					<h1 className="heading-primary">
						<span className="heading-primary--main">Transformar facturas</span>
						<span className="heading-primary--sub">Empezar ahora</span>
					</h1>
				</div>

				<div className="d-flex d-block align-items-center justify-content-center min-vh-100">
					{!loading && !error ? (
						<InputRuc planRuc={planRuc} user={user} />
					) : null}
				</div>
			</header>
			<main></main>

			<Footer />
		</div>
	);
};
export default RegisterRuc;
