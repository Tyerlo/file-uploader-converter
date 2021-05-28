import React, { useState } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { goToBillingPortal } from "../components/BillingPortal";
const DropDownMenu = ({ handleLogout }) => {
  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle caret>Menu</DropdownToggle>
        <DropdownMenu>
          <DropdownItem style={{ fontSize: "1.5rem" }}>
            <a href="/#" className="a" onClick={handleLogout}>
              Cerrar sesion
            </a>
          </DropdownItem>
          <DropdownItem style={{ fontSize: "1.5rem" }}>
            <a href="/#" className="a" onClick={goToBillingPortal}>
              Manage subscriptions
            </a>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
export default DropDownMenu;
