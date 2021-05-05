import { useField } from "formik";
import React, { Fragment } from "react";
import { Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import DropDownRuc from "./DropDownRuc";

const CardRegister = ({ props }) => {
  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <Fragment>
        <Label style={{ fontSize: "1.5rem" }} htmlFor={props.id || props.name}>
          {label}
        </Label>
        <Input
          style={{ fontSize: "1.5rem" }}
          type="select"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div style={{ fontSize: "1.5rem" }} className="text-danger">
            <i className="fas fa-times mr-1" />
            {meta.error}
          </div>
        ) : null}
      </Fragment>
    );
  };
  return (
    <Card>
      <CardBody>
        <Form onSubmit={props.handleSubmit}>
          <FormGroup>
            <MySelect label="Cantidad de Ruc" name="selectRuc">
              <option value="">Elegir cuantos ruc</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </MySelect>
          </FormGroup>
          <DropDownRuc props={props} />
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
