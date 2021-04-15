import React from "react";
import { Alert } from "reactstrap";
import { Link } from "gatsby";
import Footer from "../components/Footer";
import LoginPage from "./loginPage";
const success = () => {
  return (
    <div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--sub">
              <Alert>Verificar link en el correo electrónico</Alert>
            </span>
          </h1>
        </div>
        <div className="btn--center-button">
          <Link to="/">
            <LoginPage />
          </Link>
        </div>
      </header>
      <main></main>

      <Footer />
    </div>
  );
};
export default success;
