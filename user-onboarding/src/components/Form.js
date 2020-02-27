import React, {useEffect} from "react";
import axios from 'axios';
import * as Yup from 'yup';
import { withFormik, Form, Field } from "formik";
import {
  Input,
  Label,
  FormFeedback,
  Row,
  Button,
  FormGroup
} from "reactstrap";

const UserForm = ({errors, status, values, touched, addUser}) => {

    useEffect(() => {
        status && addUser(status); 
    }, [status])

  return (
    <Form>
      <Row>
        <FormGroup>
          <Label>Name:</Label>
          <Input tag={Field} name="name" type="text" value={values.name} invalid={touched.name && errors.name}/>
            <FormFeedback tooltip>{errors.name}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Email:</Label>
          <Input tag={Field} name="email" type="text" value={values.email} invalid={touched.email && errors.email} />
          <FormFeedback tooltip>{errors.email}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Password:</Label>
          <Input tag={Field} name="password" type="password" value={values.password} invalid={touched.password && errors.password} />
          <FormFeedback tooltip>{errors.password}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup check>
          <Label htmlFor="tos" check>
              {/* <Field id="tos" tag={Fied} name="tos" type="checkbox" /> */}
            <Input id="tos" tag={Field} name="tos" type="checkbox" invalid={touched.tos && errors.tos} />
            <FormFeedback tooltip>{errors.tos}</FormFeedback>
            Terms of Service:
          </Label>
        </FormGroup>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues() {
    return {
      name: "",
      email: "",
      password: "",
      tos: false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
    .min(2, 'Name needs to be more than 1 characters')
    .required('Name is required'),
    email: Yup.string()
    .email('Email is not valid')
    .required('E-mail is required'),
    password: Yup.string()
    .min(7, 'Password has to be more than 6 characters')
    .required('Password is required'),
    tos: Yup.bool()
        .test(
            'tos',
            'You have to agree with the Terms of Service',
            value => value === true
        )
        .required(
            'You have to agree with the Terms of Service'
        )
  }),
  handleSubmit(values, {setStatus, resetForm}){
    axios.post('https://reqres.in/api/user', values)
    .then(res => {
        setStatus(res.data);

        resetForm();
    })
    .catch(err => {
        console.log(err);
    })
  }
})(UserForm);
