import React from "react";
import { Alert } from "reactstrap";
import { Link } from "gatsby";
import Footer from "../components/Footer";
const verificationPage = () => {
  return (
    <div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--sub">
              <Alert>
                Se ha verificado tu correo electrónico. Ya puedes iniciar sesión
                con la cuenta nueva.
              </Alert>
            </span>
          </h1>
        </div>
        <div className="d-flex d-block align-items-center justify-content-center min-vh-100">
          <Link className="btn btn--dark" to="/">
            Iniciar
          </Link>
        </div>
      </header>
      <main></main>

      <Footer />
    </div>
  );
};
export default verificationPage;
