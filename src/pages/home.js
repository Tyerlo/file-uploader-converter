import React, { useState, Fragment } from "react";
import Footer from "../components/Footer";
import UploadFiles from "../components/UploadFiles";
import firebase from "gatsby-plugin-firebase";
import useAuthState from "../context/auth";
import Tabs from "../components/Tabs";
const Home = () => {
  const [modal, setModal] = useState(false);

  const [user, loading, error] = useAuthState(firebase);
  const handleLogout = async (e) => {
    await firebase.auth().signOut();
  };
  const toggle = () => setModal(!modal);

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
          <div className="btn--user-info">
            <button
              disabled={loading}
              className="btn btn--dark"
              onClick={toggle}
            >
              Iniciar
            </button>
          </div>
        )}

        <Tabs modal={modal} toggle={toggle} setModal={setModal} />
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
