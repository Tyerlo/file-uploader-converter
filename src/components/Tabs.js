import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import PageModal from "./PageModal";
const Tabs = ({ toggle }) => {
  const [activeTab, setActiveTab] = useState("1");

  const activeToggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
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
      <PageModal activeTab={activeTab} toggle={toggle} />
    </div>
  );
};
export default Tabs;
