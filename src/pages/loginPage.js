import React, { Fragment, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	Alert
} from "reactstrap";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import { navigate } from "gatsby";
import { firebaseErrors } from "../context/firebaseErrors";
import ForgotPassWord from "./forgotPassWord";

const LoginPage = ({ loginToggle, modal, setModal }) => {
	const [data, setData] = useState({
		email: "",
		passwordOne: "",
		isAdmin: false,
		error: null
	});
	const [user, loading, error] = useAuthState(firebase);

	const [passModal, setPassModal] = useState(false);
	const passToggle = () => setPassModal(!passModal);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setData({ ...data, error: null });

		await firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.passwordOne)
			.then((authUser) => {
				setData(authUser);
				navigate("/");
				setModal((closeModal) => !closeModal);
			})
			.catch((err) => {
				setData({ ...data, error: firebaseErrors[err.code] || err.message });
			});
	};

	return (
		<Fragment>
			<button
				disabled={loading}
				className="btn btn--dark "
				onClick={loginToggle}
			>
				Iniciar
			</button>
			<Modal contentClassName="modalDialog" isOpen={modal} toggle={loginToggle}>
				<ModalHeader toggle={loginToggle}>
					<div className="heading-list">
						<header className="heading-list--list"> Iniciar sesion</header>
					</div>
				</ModalHeader>
				<ModalBody>
					<Card>
						<CardBody>
							<Form onSubmit={handleSubmit}>
								<FormGroup>
									<Label style={{ fontSize: "1.5rem" }} for="email">
										Correo
									</Label>
									<Input
										onChange={handleChange}
										style={{ fontSize: "1.5rem" }}
										type="email"
										value={data.email}
										name="email"
									/>
								</FormGroup>
								<FormGroup>
									<Label style={{ fontSize: "1.5rem" }} for="password">
										Contraseña
									</Label>
									<Input
										onChange={handleChange}
										style={{ fontSize: "1.5rem" }}
										type="password"
										value={data.passwordOne}
										name="passwordOne"
									/>
								</FormGroup>
							</Form>
						</CardBody>
					</Card>
				</ModalBody>
				{data.error ? (
					<Alert style={{ fontSize: "1.5rem" }} color="danger">
						{data.error}
					</Alert>
				) : null}
				<div className="d-flex d-block align-items-center justify-content-center">
					<a
						href="/#"
						onClick={passToggle}
						className="mb-3"
						style={{ fontSize: "1.5rem" }}
					>
						Olivdaste la contraseña?
					</a>
					<ForgotPassWord
						loading={loading}
						passToggle={passToggle}
						passModal={passModal}
					/>
				</div>

				<ModalFooter>
					<button className="btn btn--dark" onClick={handleSubmit}>
						Iniciar
					</button>
					<button className="btn btn--dark" onClick={loginToggle}>
						Cancelar
					</button>
				</ModalFooter>
			</Modal>
		</Fragment>
	);
};
export default LoginPage;
