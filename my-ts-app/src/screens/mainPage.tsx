import React, { useState } from 'react';
import staticText from '../text';
import PublicBlogList from '../components/publicBlogs';
import BlogCreationComponent from '../components/blogCreation';
import { disconnect } from '../API/disconnect';
import { User, Blog } from '../interfaces';
import Avatar from '../media/Avatar.jpg';

const MainPage = ({ user, blogs }: { user: User, blogs: Blog[] }) => {
  // State to control the display of the blog creation form
  const [displayForm, setDisplayForm] = useState({ display: 'none' });

  // Function to toggle the display of the blog creation form
  const handleFormDisplay = () => {
    if (displayForm.display === 'none') {
      setDisplayForm({ display: 'flex' });
    } else {
      setDisplayForm({ display: 'none' });
    }
  };

  return (
    <div className='mainPageContainer'>
      {/* Header section */}
      <footer className='header'>
        <div>
          {/* Display user's avatar and username */}
          <img style={{ height: '16px', width: '16px' }} src={user.image || Avatar} />
          <h1>{user.username}</h1>
          {/* Button to disconnect */}
          <div className='disconnect' onClick={disconnect}>Disconnect</div>
        </div>
      </footer>
      <div className='mainPageBody'>
        <section>
          {/* Button to create a new blog */}
          <button onClick={handleFormDisplay}>Create new blog</button>
          {/* Form for creating a new blog */}
          <div style={displayForm} className='cardMainDesign blogCreationComponent'>
            <BlogCreationComponent />
            <button onClick={handleFormDisplay}>X</button>
          </div>
        </section>
        <div className='mainBlogsListContainer'>
          {/* Display static text for the home page */}
          <h4>{staticText.homePageText}</h4>
          <hr />
          {/* Display a list of public blogs */}
          <PublicBlogList blogs={blogs} />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
