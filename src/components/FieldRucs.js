import React, { Fragment, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
const FieldRucs = ({ props, selectedValue }) => {
  const [charLeft] = useState(13);

  return (
    <div>
      {selectedValue === "1" ? (
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
      ) : selectedValue === "2" ? (
        <Fragment>
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
              Ruc #2
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc2}
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
        </Fragment>
      ) : selectedValue === "3" ? (
        <Fragment>
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
              Ruc #2
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc2}
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
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Ruc #3
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc3}
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
        </Fragment>
      ) : selectedValue === "4" ? (
        <Fragment>
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
              Ruc #2
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc2}
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
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Ruc #3
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc3}
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
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Ruc #4
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc4}
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
        </Fragment>
      ) : selectedValue === "5" ? (
        <Fragment>
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
              Ruc #2
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc2}
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
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Ruc #3
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc3}
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
          <FormGroup>
            <Label style={{ fontSize: "1.5rem" }} for="email">
              Ruc #4
            </Label>
            <Input
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              style={{ fontSize: "1.5rem" }}
              type="text"
              value={props.values.ruc4}
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
        </Fragment>
      ) : null}
    </div>
  );
};
export default FieldRucs;
