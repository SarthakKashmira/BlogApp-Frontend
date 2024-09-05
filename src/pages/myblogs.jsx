import axios from 'axios'
import {useState,useEffect} from 'react'
import Blogcard from '../components/blogCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Myblogs = () => {
    const [blogs,setBlogs]=useState([]);
    const userId=localStorage.getItem('userId');
    console.log(userId)
    const isLogin=useSelector(state=>state.isLogin);
    const navigate=useNavigate();
    const getBlogs=async ()=>{
        try{
            const data=await axios.get(`https://blogapp-backend-39lz.onrender.com/blog/getuserblog/${userId}`);
            console.log(data?.data.userBlog.blogs)
            if(data.data.success)
            {
                setBlogs(data?.data?.userBlog.blogs);
            }
            
        }catch(err)
        {
            console.log(err);
        }
    }
    useEffect(()=>{
        if(!isLogin){
            navigate('/login');
          }
        getBlogs();
    },[])
  return (
    <div>
        { 
      blogs && 
      blogs.length > 0 ? 
      blogs.map((blog,key) => (<Blogcard 
      id={blog._id}
      isUser={true}
      key={key}
      title={blog.title}
      description={blog.description}
      image={blog.image}
      user={blog.user}
      time={blog.createdAt}
      />)):
      (<h1>You had not created any blog!!</h1>) 
    }
      
    </div>
  )
}

export default Myblogs
