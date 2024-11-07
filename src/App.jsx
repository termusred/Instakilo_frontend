import { useEffect, useState } from 'react';
import api from "../utils/axios.js";
import Posts from './components/Posts/index.jsx';
import Login from './components/Login/index.jsx';
import Blog from './components/Blog/index.jsx';
import Register from './components/register/index.jsx';
import Section from './components/Navbar/index.jsx';
import NotFound from './components/NotFound/index.jsx';
import Adder from './components/PostAdder/index.jsx';
import Account from './components/account/index.jsx';
import {Route , Routes , useNavigate} from "react-router-dom"
import BlogPage from './components/BlogPage/index.jsx';

function App() {
  const [route, setRoute] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    setRoute(window.location.pathname)
  }, [navigate])



  return (
    <>
      {route != "/login" && <Section/>}
      {route != "/post-blog" && <Adder/>}
      <Routes>
        <Route path='/' element={<Posts/>}/>
        {!localStorage.getItem("token") && <Route path='/login' element={<Login/>}/>}
        {!localStorage.getItem("token") &&<Route path='/register' element={<Register/>}/>}
        <Route path='/post-blog' element={<Blog/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/blog/:slug' element={<BlogPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
