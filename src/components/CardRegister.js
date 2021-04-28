import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import FieldRucs from "./FieldRucs";

const CardRegister = ({ props }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  return (
    <Card>
      <CardBody>
        <Form onSubmit={props.handleSubmit}>
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="exampleSelect">
              Cantidad de rucs
            </Label>
            <Input
              style={{ fontSize: "1.5rem" }}
              type="select"
              name="selectRuc"
              onChange={(e) => setSelectedValue(e.target.value)}
              onBlur={props.handleBlur}
              value={selectedValue}
            >
              <option value={0}>Elegir cuantos ruc</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Input>
            {selectedValue === "0" ? (
              <div style={{ fontSize: "1.5rem" }} className="text-danger">
                <i className="fas fa-times mr-1" />
                Ruc requerido
              </div>
            ) : null}
          </FormGroup>
          <FieldRucs selectedValue={selectedValue} props={props} />

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
