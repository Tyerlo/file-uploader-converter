import React from "react";
import { Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";

const CardRegister = ({ props }) => {
  return (
    <Card>
      <CardBody>
        <Form onSubmit={props.handleSubmit}>
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Correo
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="email"
              value={props.values.email}
              name="email"
            />
            {props.errors.email && props.touched.email ? (
              <div style={{ fontSize: "1.5rem" }} className="text-danger">
                <i className="fas fa-times mr-1" />
                {props.errors.email}
              </div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="password">
              Contraseña
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="password"
              value={props.values.passwordOne}
              name="passwordOne"
            />
            {props.errors.passwordOne && props.touched.passwordOne ? (
              <div style={{ fontSize: "1.5rem" }} className="text-danger">
                <i className="fas fa-times mr-1" />
                {props.errors.passwordOne}
              </div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="password-confirm">
              Confirmar Contraseña
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="password"
              value={props.values.passwordTwo}
              name="passwordTwo"
            />
            {props.errors.passwordTwo && props.touched.passwordTwo ? (
              <div style={{ fontSize: "1.5rem" }} className="text-danger">
                <i className="fas fa-times mr-1" />
                {props.errors.passwordTwo}
              </div>
            ) : null}
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};
export default CardRegister;
