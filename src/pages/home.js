import React, { useEffect, useState, Fragment } from "react";
import Footer from "../components/Footer";
import netlifyIdentity from "netlify-identity-widget";
import UploadFiles from "../components/UploadFiles";
import jwt_decode from "jwt-decode";
const Home = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    netlifyIdentity.init({
      locale: "es"
    });
    setUser(user);
  }, [user]);

  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => setUser());
  const loadSubscriptionContent = () => {
    ["premium"].forEach((type) => {
      fetch("/.netlify/functions/get-protected-content", {
        method: "POST",
        body: JSON.stringify({ type })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  };
  return (
    <div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">
              Transformar su facturas
            </span>
            <span className="heading-primary--sub">Empezar ahora</span>
          </h1>
        </div>
        {/* 
        <div className="btn--user-info">
          {user ? null : (
            <button
              className="btn btn--dark"
              onClick={() => {
                netlifyIdentity.open();
              }}
            >
              Entrar
            </button>
          )}

          {user && (
            <Fragment>
              <button
                className="btn btn--dark"
                onClick={() => {
                  netlifyIdentity.logout();
                }}
              >
                logout
              </button>
              <h1 className="heading-primary">
                <span className="heading-primary--welcome">
                  Bienvenido {user.user_metadata.full_name}
                </span>
              </h1>
            </Fragment>
          )}
        </div> */}
      </header>
      <main>
        {/* <div className="header__drop-zone">{user && <UploadFiles />}</div> */}
        <div className="header__drop-zone">
          <UploadFiles />
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default Home;
