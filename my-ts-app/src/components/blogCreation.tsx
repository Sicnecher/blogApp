import React, {useState, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { blogCreation } from '../API/blogsAPI';
import { createBlogValues } from '../interfaces';
import UploadImageComponent from './uploadImage';

const BlogCreationComponent = () => {
  const [componentKey, setComponentKey] = useState()

const initialValues: createBlogValues = {
    title: '',
    subject: '',
    description: '',
    isPublic: false
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required!')
    .max(14, 'Title must be between 0-14 characters'),
  subject: Yup.string().required('Blog subject is required').max(22),
  description: Yup.string()
    .required('Blog description is required')
    .max(120, 'Description must be between 0-120 characters'),
  isPublic: Yup.boolean().required('Please select public or private')
});

    const handleSubmit = async (values: createBlogValues) => {
        const response: any = await blogCreation(values)
        if(response.status == 200){
          const key = await response.data.key
          setComponentKey(key)
        }
      };

      return (
        !componentKey?(
            <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='blogCreateForm'>
            <div>
              <Field type="text" id="title" name="title" placeholder="Title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div>
              <Field type="text" id="subject" name="subject" placeholder="Blog Subject" />
              <ErrorMessage name="subject" component="div" className="error" />
            </div>
            <div>
              <Field type="text" id="description" name="description" placeholder="Blog Description" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <div>
              <label>
                <Field type="checkbox" name="isPublic" /> Public
              </label>
              <ErrorMessage name="isPublic" component="div" className="error" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
        </div>
          ):(
            <div>
            <UploadImageComponent keyProp={componentKey} />
          </div>
          )
     );
}

export default BlogCreationComponent