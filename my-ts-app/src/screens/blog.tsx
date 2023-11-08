import React, { useState, useEffect } from 'react';
import { Blog } from '../interfaces';
import UserCardComponent from '../components/userCardComponent';
import PostFormComponent from '../components/postFormComponent';
import { join } from '../API/blogsAPI';
import Avatar from '../media/Avatar.jpg';

const BlogComponent = ({ blog }: { blog: Blog }) => {

  // State to control the display of the blog content
  const [displayState, setDisplayState] = useState({ display: 'none' });

  // State to manage the visibility of the user card pop-up
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // State to store the user card ID for the pop-up
  const [userCardId, setUserCardId] = useState('');

  // Function to toggle the display of the blog content
  const displayHandler = () => {
    if (displayState.display === 'none') {
      if (isPopUpOpen) {
        setIsPopUpOpen(false);
      }
      setDisplayState({ display: 'block' });
    } else {
      setDisplayState({ display: 'none' });
    }
  };

  // Function to handle the user card pop-up
  const popUpUser = async (userId: string | null) => {
    if (userId) {
      setUserCardId(userId);
    }
    setIsPopUpOpen(!isPopUpOpen);
  };

  // Effect to hide the blog content when the user card pop-up is open
  useEffect(() => {
    if (isPopUpOpen && displayState.display === 'block') {
      setDisplayState({ display: 'none' });
    }
  }, [isPopUpOpen]);

  return (
    <div className='blogContainer'>
      <div style={displayState} className='cardMainDesign'>
        {/* Component for posting content to the blog */}
        <PostFormComponent keyProp={blog._id} />
        <hr />
        <div className='homeBtn' onClick={displayHandler}>X</div>
      </div>
      <UserCardComponent isOpen={isPopUpOpen} onClose={popUpUser} userId={userCardId} />
      <div>
        <div className='blogFooterContainer'>
          <div>
            {/* Display blog title and subject */}
            <h2>{blog.title}</h2>
            <h4>{blog.subject}</h4>
          </div>
          <h2 className='homeBtn' onClick={displayHandler}>Post Something!</h2>
        </div>
        <hr />
        <div className='postsContainer'>
          {blog.posts.map((post, index) => (
            <div className='singlePostContainer' key={index}>
              <footer className='upperPostContainer postFooter' onClick={() => popUpUser(post.authorId)}>
                <img className='profile' style={{ height: '16px', width: '16px' }} src={post.authorImage || Avatar} />
                <p className='homeBtn'>{post.authorName}</p>
                <p>{post.postTime}</p>
              </footer>
              <div className='postInputContainer'><p className='postInput'>{post.postInput}</p></div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <h3 className='homeBtn' onClick={() => join(blog._id)}>Join</h3><h4 className='homeBtn' onClick={() => window.location.href = '/'}>Home Screen</h4>
    </div>
  );
};
export default BlogComponent;