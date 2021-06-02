import React, { useState } from "react";
import { ModalBody, ModalFooter, Form, Card, CardBody } from "reactstrap";
import { Formik } from "formik";
import { Fragment } from "react";
import { validateRuc } from "../util/ValidateRuc";
import RucFields from "./RucFields";
import useAuthState from "../context/auth";
import { getStripe } from "../util/stripe";
import firebase from "gatsby-plugin-firebase";

const InputRuc = ({ product, hideRuc }) => {
	const [loading, setLoading] = useState(false);

	const [user, loadingFirebase, error] = useAuthState(firebase);
	const subscribe = async (priceId, values) => {
		setLoading(loadingFirebase);

		const docRef = await firebase
			.firestore()
			.collection("users")
			.doc(user.uid)
			.collection("checkout_sessions")
			.add({
				price: priceId,
				ruc: [values.ruc, values.ruc2, values.ruc3, values.ruc4, values.ruc5],
				success_url: window.location.origin,
				cancel_url: window.location.origin
			});

		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();
			if (error) {
				// Show an error to your customer and
				// inspect your Cloud Function logs in the Firebase console.
				alert(`An error occured: ${error.message}`);
			}
			if (sessionId) {
				// We have a session, let's redirect to Checkout
				// Init Stripe
				const stripe = await getStripe();
				stripe.redirectToCheckout({
					sessionId
				});
			}
		});
	};

	return (
		<div>
			<Formik
				validationSchema={validateRuc}
				initialValues={{
					selectRuc: product.name,
					ruc: "",
					ruc2: "",
					ruc3: "",
					ruc4: "",
					ruc5: ""
				}}
				onSubmit={(values) => {
					return product && product.prices.map((p) => subscribe(p.id, values));
				}}
				enableReinitialize
			>
				{(props) => (
					<Fragment>
						<ModalBody>
							<Card>
								<CardBody>
									<Form onSubmit={props.handleSubmit}>
										<RucFields props={props} />
									</Form>
								</CardBody>
							</Card>
						</ModalBody>
						<ModalFooter>
							<button
								// key={p.id}
								disabled={loading}
								type="submit"
								className="btn btn--dark"
								onClick={props.handleSubmit}
							>
								Compra
							</button>

							<button className="btn btn--dark" onClick={hideRuc}>
								Cancelar
							</button>
						</ModalFooter>
					</Fragment>
				)}
			</Formik>
		</div>
	);
};

export default InputRuc;
