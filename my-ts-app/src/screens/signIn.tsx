import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signInAPI } from '../API/signAPI';
import { SignInFormValues } from '../interfaces';

// Define validation schema for form fields using Yup
const validationSchema: Yup.Schema<SignInFormValues> = Yup.object({
  username: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required')
});

// Define initial form field values
const initialValues: SignInFormValues = {
  username: '',
  password: ''
};

const SignUp: React.FC = () => {
  // Function to handle form submission
  const handleSubmit = (values: SignInFormValues) => {
    // Call the signInAPI with the form values when the form is submitted
    signInAPI(values);
  };

  return (
    <div className='signInUpFormContainer'>
      <h1>Sign in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field type="text" id="username" name="username" placeholder="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div>
            <Field type="text" id="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <h4 onClick={() => window.location.href = '/signUp'}>Sign Up?</h4>
    </div>
  );
};

export default SignUp;
