import React, { useEffect, useState, Fragment } from "react";
import Footer from "../components/Footer";
import netlifyIdentity from "netlify-identity-widget";
import UploadFiles from "../components/UploadFiles";
import jwt_decode from "jwt-decode";
const Home = () => {
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   netlifyIdentity.init({
  //     locale: "es"
  //   });
  //   setUser(user);
  // }, [user]);

  // netlifyIdentity.on("login", (user) => {
  //   netlifyIdentity.close();
  //   loadSubscriptionContent(setUser(user));
  // });

  // netlifyIdentity.on("logout", () => loadSubscriptionContent(setUser));
  // const loadSubscriptionContent = () => {
  //   ["premium"].forEach((type) => {
  //     fetch("/.netlify/functions/get-protected-content", {
  //       method: "POST",
  //       body: JSON.stringify({ type })
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // const template = document.querySelector("#content");
  //         // const container = document.querySelector(`.${type}`);
  //         // // remove any existing content from the content containers
  //         // const oldContent = document.querySelector(".content-display");
  //         // if (oldContent) {
  //         //   document.removeChild(oldContent);
  //         // }
  //         // const content = template.content.cloneNode(true);
  //         // const img = content.querySelector("img");
  //         // img.src = data.src;
  //         // img.alt = data.alt;
  //         // const caption = content.querySelector("figcaption");
  //         // caption.innerText = data.message;
  //         // container.appendChild(content);
  //       });
  //   });
  // };
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
        {/* <template id="content">
          <figure class="content-display">
            <img />
            <figcaption>
              <a class="credit"></a>
            </figcaption>
          </figure>
        </template> */}
        <div className="header__drop-zone">
          <UploadFiles />
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default Home;
