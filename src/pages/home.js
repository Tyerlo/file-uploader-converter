import React from "react";
import Footer from "../components/Footer";

import UploadFiles from "../components/UploadFiles";
import Register from "../pages/register";
const Home = () => {
  return (
    <div>
      <header className="header">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Transformar facturas</span>
            <span className="heading-primary--sub">Empezar ahora</span>
          </h1>
        </div>
        <Register />
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
