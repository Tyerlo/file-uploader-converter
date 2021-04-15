import React, { useState } from "react";
import Footer from "../components/Footer";
import UploadFiles from "../components/UploadFiles";
import Register from "../pages/register";
import StartPage from "./startPage";
const Home = () => {
  const [modal, setModal] = useState(false);

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
        <div className="btn--user-info">
          <button className="btn btn--dark" onClick={toggle}>
            Entrar
          </button>
        </div>
        <StartPage modal={modal} toggle={toggle} />
      </header>
      <main>
        <div className="header__drop-zone">
          <UploadFiles />
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default Home;
