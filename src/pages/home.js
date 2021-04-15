import React, { Fragment, useState } from "react";
import Footer from "../components/Footer";
import UploadFiles from "../components/UploadFiles";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import Register from "../pages/register";
import LoginPage from "../pages/loginPage";
const Home = () => {
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [user, loading, error] = useAuthState(firebase);
  const handleLogout = async (e) => {
    await firebase.auth().signOut();
  };
  const toggle = () => setModal(!modal);

  const loginToggle = () => setLoginModal(!loginModal);

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
            <button className="btn btn--dark" onClick={handleLogout}>
              Cerrar sesion
            </button>
            {/* <h1 className="heading-primary">
              <span className="heading-primary--welcome">
                Bienvenido {user.user_metadata.full_name}
              </span>
            </h1> */}
          </div>
        ) : (
          <Fragment>
            <div className="btn--center-button">
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
            <UploadFiles />
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};
export default Home;
