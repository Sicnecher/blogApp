import React, { useState, useEffect } from 'react';
import { getBlogs, join } from '../API/blogsAPI';
import { Blog } from '../interfaces';
import blogPic from '../media/blogPic.png'

const PublicBlogsComponent = ({blogs}: {blogs: Blog[]}) => {

    return (
      <div className='mainBlogsContainer'>
        {blogs.map((blog: Blog) => {
            if(blog.isPublic){
                return (
                  <div className='blogCardContainer'>
                  <div key={blog._id} onClick={() => window.location.href = `/${blog._id}`} className='blogCard'>
                    <h4>{blog.title}</h4>
                    <img src={blog.image || blogPic} alt={blog.title} />
                  </div>
                  <div className='blogCardBtn' onClick={() => join(blog._id)}>Join</div>
                  </div>
                )
            }
        })}
      </div>
    );
};

export default PublicBlogsComponent;
