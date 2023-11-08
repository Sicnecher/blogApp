import React, { useState } from 'react';
import UploadImageComponent from '../components/uploadImage';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signUpAPI } from '../API/signAPI';
import { usernameAvailabilityAPI } from '../API/userAPI'
import { SignUpFormValues } from '../interfaces';

const SignUp = () => {
  // State to track the key for rendering the next component
  const [componentKey, setComponentKey] = useState(null);

   // Function to check if a username is available by making an API call
  const isUsernameAvailable = async (username: string) => {
    const response = await usernameAvailabilityAPI(username);
    return response;
  };

  //yup schema for form validation 
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .test('username-availability', 'Username already exists', async (value) => {
        return await isUsernameAvailable(value);
      }),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Initial form field values
  const initialValues: SignUpFormValues = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  // Function to handle form submission
  const handleSubmit = async (values: SignUpFormValues) => {
    const response = await signUpAPI(values);
    if (response && response.status === 200) {
      const key = response.data._id;
      setComponentKey(key);
    }
  };

  return (
     // Conditional rendering based on the componentKey state to display the right component
    !componentKey ? (
      <div className='signInUpFormContainer'>
        <h1>Sign up</h1>
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
              <Field type="text" id="email" name="email" placeholder="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <Field type="text" id="password" name="password" placeholder="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <Field type="text" id="confirm_password" name="confirm_password" placeholder="confirm password" />
              <ErrorMessage name="confirm_password" component="div" className="error" />
            </div>
            <br />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
        <h4 onClick={() => window.location.href = '/'}>Sign In?</h4>
      </div>
    ) : (
      <UploadImageComponent keyProp={componentKey} /> //component to upload user profile
    )
  );
};

export default SignUp;
