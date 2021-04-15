import React from "react";
import { TabContent, TabPane, Row, Col } from "reactstrap";
import Register from "../pages/register";
import LoginPage from "../pages/loginPage";
const PageModal = ({ activeTab, toggle }) => {
  return (
    <div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Register toggle={toggle} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <LoginPage toggle={toggle} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};
export default PageModal;
