import React, { useState } from "react";
import { Modal } from "reactstrap";

import Tabs from "../components/Tabs";

const StartPage = ({ modal, toggle, setModal }) => {
  return (
    <Modal contentClassName="modalDialog" isOpen={modal} toggle={toggle}>
      <Tabs toggle={toggle} setModal={setModal} />
    </Modal>
  );
};

export default StartPage;
