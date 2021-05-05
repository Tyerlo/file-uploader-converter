import React, { useState, Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";
const DropDownRuc = ({ props }) => {
  const [charLeft] = useState(13);

  const ruc1 = (
    <FormGroup>
      <Label style={{ fontSize: "1.5rem" }} for="email">
        Ruc
      </Label>
      <Input
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        style={{ fontSize: "1.5rem" }}
        type="text"
        value={props.values.ruc || ""}
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
  );
  const ruc2 = (
    <FormGroup>
      <Label style={{ fontSize: "1.5rem" }} for="email">
        Ruc #2
      </Label>
      <Input
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        style={{ fontSize: "1.5rem" }}
        type="text"
        value={props.values.ruc2 || ""}
        name="ruc2"
        maxLength={13}
      />
      {props.errors.ruc2 && props.touched.ruc2 ? (
        <div style={{ fontSize: "1.5rem" }} className="text-danger">
          <i className="fas fa-times mr-1" />
          {props.errors.ruc2}
        </div>
      ) : null}
      <p style={{ fontSize: "1.5rem" }} className="float-right">
        {props.values.ruc2.length}/{charLeft}
      </p>
    </FormGroup>
  );
  const ruc3 = (
    <FormGroup>
      <Label style={{ fontSize: "1.5rem" }} for="email">
        Ruc #3
      </Label>
      <Input
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        style={{ fontSize: "1.5rem" }}
        type="text"
        value={props.values.ruc3 || ""}
        name="ruc3"
        maxLength={13}
      />
      {props.errors.ruc3 && props.touched.ruc3 ? (
        <div style={{ fontSize: "1.5rem" }} className="text-danger">
          <i className="fas fa-times mr-1" />
          {props.errors.ruc3}
        </div>
      ) : null}
      <p style={{ fontSize: "1.5rem" }} className="float-right">
        {props.values.ruc3.length}/{charLeft}
      </p>
    </FormGroup>
  );
  const ruc4 = (
    <FormGroup>
      <Label style={{ fontSize: "1.5rem" }} for="email">
        Ruc #4
      </Label>
      <Input
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        style={{ fontSize: "1.5rem" }}
        type="text"
        value={props.values.ruc4 || ""}
        name="ruc4"
        maxLength={13}
      />
      {props.errors.ruc4 && props.touched.ruc4 ? (
        <div style={{ fontSize: "1.5rem" }} className="text-danger">
          <i className="fas fa-times mr-1" />
          {props.errors.ruc4}
        </div>
      ) : null}
      <p style={{ fontSize: "1.5rem" }} className="float-right">
        {props.values.ruc4.length}/{charLeft}
      </p>
    </FormGroup>
  );
  const ruc5 = (
    <FormGroup>
      <Label style={{ fontSize: "1.5rem" }} for="email">
        Ruc #5
      </Label>
      <Input
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        style={{ fontSize: "1.5rem" }}
        type="text"
        value={props.values.ruc5}
        name="ruc5"
        maxLength={13}
      />
      {props.errors.ruc5 && props.touched.ruc5 ? (
        <div style={{ fontSize: "1.5rem" }} className="text-danger">
          <i className="fas fa-times mr-1" />
          {props.errors.ruc5}
        </div>
      ) : null}
      <p style={{ fontSize: "1.5rem" }} className="float-right">
        {props.values.ruc5.length}/{charLeft}
      </p>
    </FormGroup>
  );
  return (
    <div>
      {props.values.selectRuc === "1" ? <Fragment>{ruc1}</Fragment> : null}
      {props.values.selectRuc === "2" ? (
        <Fragment>
          {ruc1}
          {ruc2}
        </Fragment>
      ) : null}
      {props.values.selectRuc === "3" ? (
        <Fragment>
          {ruc1}
          {ruc2}
          {ruc3}
        </Fragment>
      ) : null}
      {props.values.selectRuc === "4" ? (
        <Fragment>
          {ruc1}
          {ruc2}
          {ruc3}
          {ruc4}
        </Fragment>
      ) : null}
      {props.values.selectRuc === "5" ? (
        <Fragment>
          {ruc1}
          {ruc2}
          {ruc3}
          {ruc4}
          {ruc5}
        </Fragment>
      ) : null}
    </div>
  );
};
export default DropDownRuc;
