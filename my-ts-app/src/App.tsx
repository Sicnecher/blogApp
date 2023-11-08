import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './screens/signUp';
import SignIn from './screens/signIn';
import MainPage from './screens/mainPage';
import BlogScreen from './screens/blog';
import { authenticateUser, getUser } from './API/userAPI';
import { getBlogs } from './API/blogsAPI';
import { Blog, User } from './interfaces';
import BlogsListComponent from './components/blogsList';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[] | []>([]);
  const [hasUser, setHasUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hasUserData = await authenticateUser();
        setHasUser(hasUserData);
      } catch (error) {
        console.error('Error checking user data:', error);
      }
  
      if (!hasUser) {
        try {
          const userData = await getUser(undefined);
          setUser(userData);
          console.log(userData)
  
          const blogData = await getBlogs( { isPublic: true } );
          setBlogs(blogData);

          const response = await getBlogs( { members: { $elemMatch: { memberId: userData._id } } } )
          setUserBlogs(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData()
  }, [])

  return (
    <>
  {isLoading?(
    <div>Loading...</div>
    ):(
      <>
      <Router>
      <Routes>
        {hasUser === false ? (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </>
        ) : user ? (
          <>
          <Route path="/" element={<div className='mainFlex'><MainPage user={user} blogs={blogs} /><BlogsListComponent blogs={userBlogs} state='homeBar' /></div>} />
          {blogs.map((blog: Blog) => (
            <Route
              key={blog._id}
              path={`/${blog._id}`}
              element={<div className='mainFlex'><BlogScreen blog={blog} /><BlogsListComponent blogs={userBlogs} state='homeBar' /></div>}
            />
          ))}
          </>
        ) : (
          <>
          <Route path="/" element={<h1>error</h1>} />
          </>
        )}
        </Routes>
    </Router>
    </>
    )}
    </>
  );
};

export default App;