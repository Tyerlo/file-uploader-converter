import React from "react";
import VerifyEmail from "./verifyEmail";
import ResetPassword from "./resetPassword";
import queryString from "query-string";
import Footer from "../components/Footer";
import { Link } from "gatsby";
import "../../styles/sass/main.scss";

const Action = (props) => {
  const parsed = queryString.parse(props.location.search);

  const mode = parsed.mode;

  const actionCode = parsed.oobCode;

  switch (mode) {
    case "verifyEmail":
      return <VerifyEmail actionCode={actionCode} />;

    case "resetPassword":
      return <ResetPassword actionCode={actionCode} />;

    default:
      return (
        <div>
          <header className="header">
            <div className="header__text-box">
              <h1 className="heading-primary">
                <span className="heading-primary--sub"></span>
              </h1>
            </div>
            <div className="d-flex d-block align-items-center justify-content-center min-vh-100">
              <Link to="/" className="btn btn--dark">
                Regresar a pagina
              </Link>
            </div>
          </header>
          <main></main>

          <Footer />
        </div>
      );
  }
};
export default Action;
