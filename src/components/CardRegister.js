import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
const CardRegister = ({ props }) => {
  const [charLeft] = useState(13);
  return (
    <Card>
      <CardBody>
        <Form onSubmit={props.handleSubmit}>
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="exampleSelect">
              Elegir cuantos ruc
            </Label>
            <Input
              style={{ fontSize: "1.5rem" }}
              type="select"
              name="selectRuc"
            >
              <option selected={1}>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Ruc
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc}
              name="ruc"
              maxLength={13}
            />
            {props.errors.ruc && props.touched.ruc ? (
              <div style={{ fontSize: "1.5rem" }} className="text-danger">
                <i className="fas fa-times mr-1" />
                {props.errors.ruc}
              </div>
            ) : null}
            <p style={{ fontSize: "1.5rem" }} className="float-right">
              {props.values.ruc.length}/{charLeft}
            </p>
          </FormGroup>
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
