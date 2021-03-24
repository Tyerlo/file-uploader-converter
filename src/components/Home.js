import React from "react";
import Footer from "./Footer";

import UploadFiles from "./UploadFiles";

const Home = () => {
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
