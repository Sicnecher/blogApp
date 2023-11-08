import axios from 'axios';
import { API } from './dotenv.API';
import { PostFormValues, createBlogValues, blogsMainQuery } from '../interfaces';

//API function to get different blog documents
const getBlogs = async (query: blogsMainQuery) => {

  try {
    console.log(query)
    const response = await axios.post(`API/blogs/getBlogs`, {
      headers: {
        Authorization: API.KEY,
      },
      body: { query: query }
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error
  }
};

//API to handle blog creation
  const blogCreation = async (values: createBlogValues) => {
    try {
        const response = await axios.post(`API/blogs/createBlog`, {
            headers: {
                Authorization: API.KEY
            },
            body: values
        });
        console.log(response)
        if(response.status == 200){
          return response
        }
      } catch (error) {
        console.error('An error occurred:', error);
        throw error;
      }
  };

  //API to handle a new post upload
  const uploadPost = async (key: string, values: PostFormValues) => {
    try {
      const response = await axios.post(`API/blogs/uploadPost`, {
          headers: {
              Authorization: API.KEY
          },
          body: {
            values: values,
            key: key
          }
      });
      if(response.status == 200){
        window.location.href = `/${key}`
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  };

  //API to handle request for certain blogs
  const requestedBlogs = async (param: string) => {
    try{
      const response = await axios.post(`/API/blogs/getBlogs?query=${param}`, {
        headers:{
          Authorization: API.KEY
        }
      })
      if(response.status === 200){
        console.log(response.data)
          return response.data
      }
    }catch(error){
      console.log(error)
    }
  }

  //API to handle joining to a blog
  const join = async (blogId: string) => {
    const response = await axios.post('/API/blogs/addMember',{
      headers: {
        Authorization: API.KEY
      },
      body: { _id: blogId }
    });

    if(response.status === 200){
      console.log('response is succesfull')
      window.location.href = '/'
    }
  }

  export {blogCreation, getBlogs, uploadPost, requestedBlogs, join}