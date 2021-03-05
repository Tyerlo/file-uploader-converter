import React from "react";
import UploadFiles from "../components/UploadFiles";

import { Card, Button, FormGroup, Form, CardBody } from "reactstrap";
import * as Yup from "yup";
import { Formik } from "formik";
const Forms = () => {
  const validationSchema = Yup.object({
    files: Yup.string().required("Files can't be empty").nullable(true)
  });

  const initialValues = {
    files: null
  };
  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <FormGroup>
                <UploadFiles setFieldValue={props.setFieldValue} />
                {props.errors.files && props.touched.files ? (
                  <div className="text-danger">
                    <i className="fas fa-times ml-1" />
                    {props.errors.files}
                  </div>
                ) : null}
              </FormGroup>

              <Button type="submit" variant="outlined" color="primary">
                Transform
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
export default Forms;
