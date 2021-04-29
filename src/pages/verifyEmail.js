import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { navigate } from "gatsby";
import Footer from "./Footer";
import firebase from "gatsby-plugin-firebase";

const VerificationPage = ({ actionCode }) => {
  const [data, setData] = useState({
    error: "",
    validCode: null,
    verifiedCode: false
  });

  useEffect(() => {
    firebase
      .auth()
      .applyActionCode(actionCode)
      .then(() => {
        setData({ validCode: true, verifiedCode: true });
      })
      .catch((err) => {
        setData({ error: err.message, validCode: false, verifiedCode: true });
      });
  }, [actionCode]);

  const refreshPage = () => {
    navigate("/");
  };

  return (
    <div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--sub">
              {!data.verifiedCode ? (
                <Alert>Loading...</Alert>
              ) : data.verifiedCode && data.validCode ? (
                <Alert>
                  Se ha verificado el correo electrónico. Iniciar sesión con la
                  cuenta creada.
                </Alert>
              ) : null}
            </span>
          </h1>
        </div>
        <div className="d-flex d-block align-items-center justify-content-center min-vh-100">
          <button
            disabled={!data.validCode && !data.verifiedCode}
            onClick={refreshPage}
            className="btn btn--dark"
          >
            Iniciar
          </button>
        </div>
      </header>
      <main></main>

      <Footer />
    </div>
  );
};
export default VerificationPage;
