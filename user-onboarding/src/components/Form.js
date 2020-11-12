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
        if(status){
          addUser(status); 
        }
    }, [status])

  return (
    <Form>
      <Row>
        <FormGroup>
          <Label>Name:</Label>
          <Field as={Input} name="name" invalid={touched.name && errors.name}/>
            <FormFeedback tooltip>{errors.name}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Email:</Label>
          <Field as={Input}  name="email" invalid={touched.email && errors.email} />
          <FormFeedback tooltip>{errors.email}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Password:</Label>
          <Field as={Input} name="password" type="password" invalid={touched.password && errors.password} />
          <FormFeedback tooltip>{errors.password}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Location:</Label>
          <Field as={Input} name="location" invalid={touched.location && errors.location} />
          <FormFeedback tooltip>{errors.location}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Favorite Color:</Label>
          <Field as={Input} name="color" invalid={touched.color && errors.color} />
          <FormFeedback tooltip>{errors.color}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Label>Phone Number:</Label>
          <Field as={Input} name="phone" type="phone" invalid={touched.phone && errors.phone} />
          <FormFeedback tooltip>{errors.phone}</FormFeedback>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup check>
          <Label htmlFor="tos" check>
              {/* <Field id="tos" tag={Fied} name="tos" type="checkbox" /> */}
            <Field id="tos" as={Input} name="tos" type="checkbox" invalid={touched.tos && errors.tos} />
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
      location: '',
      color: '',
      phone: '',
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
    location: Yup.string().min(5, 'Needs to be a minimum of 5 characters.'),
    color: Yup.string(),
    phone: Yup.string().length(10, 'Phone needs to be 10 characters (555)555-5555'),
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
