import './App.css';
import {Post,Login,Register, Footer,Create,PostPage,EditPost} from './components/components';
import { UserContextProvider } from './UserContext';
import './index.css';
import { Routes,Route} from 'react-router-dom';
import Layout from './components/layout'
import { useEffect, useState } from 'react';

function App() {
  const [posts,setPosts] = useState([]);



  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });

    });

  },[]);
  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={
        <>
       <div className='welcome'>
        <h1 className='gradient__text'>Welcome! What are you sharing today?</h1>
        </div>
        {posts.length >0 && posts.map(post => (
      <Post {...post} />
  ))}
      </>
      }/>

<Route path ={'/post'} element={
      <>
      <div className='welcome-p'>
        <h1 className='gradient__text'>Today's Posts</h1>
        </div>
    {posts.length >0 && posts.map(post => (
      <Post {...post} />
  ))}
    </>
  } />
    
    <Route path ={'/login'} element={<Login />} />
    <Route path ={'/register'} element={<Register />} />
    <Route path ={'/footer'} element={<Footer />} />
    <Route path ={'/create'} element ={<Create />} />
    <Route path={'/post/:id'} element={<PostPage/>} />
    <Route path = {'/edit/:id'} element={<EditPost/>} />

</Route>

</Routes>

    </UserContextProvider>
   
   </>
  );
}

export default App;
