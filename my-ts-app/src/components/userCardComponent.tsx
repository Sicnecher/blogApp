import React, { useState, useEffect } from 'react';
import { getBlogs } from '../API/blogsAPI';
import { getUser } from '../API/userAPI';
import { User, Blog } from '../interfaces';
import BlogsListComponent from './blogsList';

const UserCardComponent = ({ isOpen, onClose, userId }: { isOpen: boolean, onClose: (userId: string | null) => void, userId: string }) => {
  // State to store user data
  const [user, setUser] = useState<User | null>(null);

  // State to store user's blogs
  const [blogs, setBlogs] = useState<Blog[] | []>([]);

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          // Fetch user data based on the provided userId
          const userData = await getUser(userId);
          setUser(userData._doc);

          // Fetch blogs associated with the user
          const blogData = await getBlogs({ members: { $elemMatch: { memberId: userId } } });
          setBlogs(blogData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  return (
    isOpen ? (
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : user ? (
          <div className='cardMainDesign'>
            <footer>
              <img src={user.image} />
              <div>
                <h1>{user.username}</h1>
                <h2>{user.email}</h2>
              </div>
            </footer>

            {/* Display user's blogs using BlogsListComponent */}
            <BlogsListComponent blogs={blogs} state='userCard' />

            <hr />
            <div className='homeBtn' onClick={() => onClose(null)}>X</div>
          </div>
        ) : (
          ''
        )}
      </div>
    ) : (
      <hr />
    )
  );
};

export default UserCardComponent;
