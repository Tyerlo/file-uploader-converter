import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import Layout from "../components/Layout";
import UploadFiles from "../components/UploadFiles";

const Home = () => {
  return (
    <Layout>
      <UploadFiles />
    </Layout>
  );
};

export default Home;
