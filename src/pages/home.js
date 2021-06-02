import React, { Fragment, useEffect, useState } from "react";
import Footer from "./footer";
import UploadFiles from "../components/UploadFiles";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import Register from "../pages/register";
import LoginPage from "../pages/loginPage";
import Products from "../components/Products";
import DropDownMenu from "../components/DropDownMenu";

const Home = () => {
	const [modal, setModal] = useState(false);
	const [loginModal, setLoginModal] = useState(false);

	const [user, loading, error] = useAuthState(firebase);

	const handleLogout = async (e) => {
		await firebase.auth().signOut();
	};
	const toggle = () => setModal(!modal);

	const loginToggle = () => setLoginModal(!loginModal);

	const [planRuc, setPlanRuc] = useState([]);
	useEffect(() => {
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
				{user && user.emailVerified ? (
					<div className="btn--user-info">
						<DropDownMenu handleLogout={handleLogout} />
						<h1 className="heading-primary">
							<span className="heading-primary--welcome">
								Bienvenido {user.email}
							</span>
						</h1>
					</div>
				) : (
					<Fragment>
						<div className="d-flex d-block align-items-center justify-content-center min-vh-100">
							<Register toggle={toggle} modal={modal} setModal={setModal} />
							<LoginPage
								loginToggle={loginToggle}
								modal={loginModal}
								setModal={setLoginModal}
							/>
						</div>
					</Fragment>
				)}
			</header>
			<main>
				{user && user.emailVerified ? (
					<div className="header__drop-zone">
						<Products />
					</div>
				) : null}
				{/**planRuc if they have a plan show Uploadfiles */}
				{/* <UploadFiles /> */}
			</main>

			<Footer />
		</div>
	);
};
export default Home;
