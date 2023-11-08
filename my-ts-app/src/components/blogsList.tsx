import React, { useState } from "react";
import { Blog } from "../interfaces";
import Avatar from "../media/Avatar.jpg"
import { requestedBlogs } from "../API/blogsAPI";

const BlogsListComponent = ({ blogs, state }: { blogs: Blog[] | null, state: string}) => {
  //shows selected blogs incase the blogs displayed as an option for userCard
  const [selectedBlog, setSelectedBlog] = useState('');
  //set the displayed blogs for the user bar
  const [displayedBlogs, setDisplayedBlogs] = useState(blogs)

    return (
      //starting to display once the properties are loaded to evade errors
        displayedBlogs && blogs?(
          //checks the state to produce the right component
          state === 'homeBar'?(
              <div className="personalBlogs">
              <input type="text" name="blog" placeholder='enter blog description' onChange={ async (e) => {
                if(e.target.value !== ''){
                const response = await requestedBlogs(e.target.value)
                setDisplayedBlogs(response)
                }else{
                   setDisplayedBlogs(blogs)
                }
            }} />
          <div>
          {displayedBlogs.map((blog) => {
            return (
              <section className="personalBlogCard" onClick={ () => window.location.href = `/${blog._id}`}>
                <img className='profile' src={blog.image || Avatar} />
                <div>
                <h3>{ blog.title }</h3>
                <p>{ blog.subject }</p>
                </div>
              </section>
          )
          })}
          </div>
        </div>
          ):state === 'userCard'?(
            <div>
            <label>Select blog: </label>
      <select
        value={selectedBlog}
        onChange={(e) => setSelectedBlog(e.target.value)}>
        <option value="">go to a blog</option>
        {blogs.map((blog) => (
          <option key={blog._id} value={blog._id}>{blog.title}</option>
        ))}
      </select>
      <div>
      <button onClick={() => window.location.href=`/${selectedBlog}`}>go to blog</button>
      </div>
        </div>
          ):(<div>error</div>)
        ):(
            <h1>Loading...</h1>
        )
    )
};

export default BlogsListComponent