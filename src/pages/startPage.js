import React, { useState } from "react";
import { Modal } from "reactstrap";

import Tabs from "../components/Tabs";

const StartPage = ({ modal, toggle }) => {
  return (
    <Modal contentClassName="modalDialog" isOpen={modal} toggle={toggle}>
      <Tabs toggle={toggle} />
    </Modal>
  );
};

export default StartPage;
