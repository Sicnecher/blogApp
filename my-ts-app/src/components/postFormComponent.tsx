import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PostFormValues } from '../interfaces';
import { uploadPost } from '../API/blogsAPI';

const PostFormComponent = ({ keyProp }: { keyProp: string }) => {
  //form validation schema
    const validationSchema: Yup.Schema<PostFormValues> = Yup.object({
        postInput: Yup.string().required('Input is required').max(1200, 'between 0-1200 characters')
      });
    //initial form values
    const initialValues: PostFormValues = {
      postInput: ''
    };
    const handleSubmit = async (values: PostFormValues) => {
      await uploadPost(keyProp, values)
      };
    
      return (
        <div>
          <h1>Write your own post!</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="postInput">Enter Input</label>
                <Field type="postInput" id="postInput" name="postInput" />
                <ErrorMessage name="postInput" component="div" className="error" />
              </div>
    
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      )
}

export default PostFormComponent