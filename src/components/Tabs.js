import React, { useState } from "react";
import {
  Modal,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import Register from "../pages/register";
import LoginPage from "../pages/loginPage";

const Tabs = ({ modal, toggle, setModal }) => {
  const [activeTab, setActiveTab] = useState("1");

  const activeToggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Modal contentClassName="modalDialog" isOpen={modal} toggle={toggle}>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            style={{ fontSize: "1.5rem" }}
            onClick={() => {
              activeToggle("1");
            }}
          >
            Crear cuenta
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            style={{ fontSize: "1.5rem" }}
            onClick={() => {
              activeToggle("2");
            }}
          >
            Iniciar
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="activeTab" activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Register toggle={toggle} setModal={setModal} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <LoginPage toggle={toggle} setModal={setModal} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Modal>
  );
};
export default Tabs;
