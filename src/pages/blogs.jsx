import axios from "axios"
import {useState,useEffect} from "react"
import Blogcard from "../components/blogCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Blogs = () => {
  const [blogs,setBlogs]=useState([])
  const navigate=useNavigate();
  const isLogin=useSelector(state=>state.isLogin);
  const getAllBlogs=async ()=>{
    const data=await axios.get(`https://blogapp-backend-39lz.onrender.com/blog/allblogs`);
    if(data.data.success){
      console.log(data.data.blogs)
      setBlogs(data.data?.blogs)
    }
  }
  useEffect(()=>{
    if(!isLogin){
      navigate('/login');
    }
    getAllBlogs();

  },[])
  return (
    <>
    {(blogs.length==0) && <div>No Blogs Found!!</div>}
    {
      blogs && blogs.map((blog,key) => <Blogcard 
      id={blog._id}
      key={key}
      isUser={localStorage.getItem('userId')==blog.user._id}
      title={blog.title}
      description={blog.description}
      image={blog.image}
      user={blog.user.username}
      time={blog.createdAt}
      /> )
    }
    </>
  )
}

export default Blogs
