import React,{useState,useEffect} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"
const Blogdetails = () => {
    const [blog,setBlog]=useState({})
    const navigate=useNavigate();
    const id=useParams().id;
    const isLogin=useSelector(state=>state.isLogin); 
    const userId=localStorage.getItem('userId');
    const [inputs,setInputs]=useState({
      title:"",
      description:"",
      image:"",
      user:userId
  })
  
    const getblogdetails=async ()=>{
      try{
        const {data}=await axios.get(`http://localhost:5000/blog/getblog/${id}`);
        if(data?.success)
        {
            setBlog(data?.blog);
            setInputs({
              title:data?.blog.title,
              description:data?.blog.description,
              image:data?.blog.image,
              user:userId
            })
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
        getblogdetails();
    },[id])
    
    
    const handleChange=(e)=>{
        setInputs(prevState=>({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }

      const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
          const {data}=await axios.put(`http://localhost:5000/blog/updateblog/${id}`,{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:userId
          });
          if(data?.success)
          {
            alert("Blog updated successfully!!");
            navigate("/blogs");
          }
        }catch(err)
        {
          console.log(err);
        }
      }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box width={'50%'} border={3} borderRadius={10} padding={3} margin="auto" boxShadow={'10px 10px 20px #ccc'} display='flex' flexDirection={'column'} marginTop={2}>
            <Typography variant="h2" textAlign="center" fontWeight={'bold'} padding={3} color="gray">EDIT THE BLOG</Typography>
            <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:"bold"}}>Title</InputLabel>
            <TextField value={inputs.title} margin="normal" placeholder="Title" name="title" onChange={handleChange} variant="outlined" borderRadius={10} required/>

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:"bold"}}>Description</InputLabel>
            <TextField value={inputs.description} margin="normal" placeholder="Description" name="description" onChange={handleChange} variant="outlined" borderRadius={10} required />

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:"bold"}}>Image</InputLabel>
            <TextField value={inputs.image} margin="normal" placeholder="Image" name="image" onChange={handleChange} variant="outlined" borderRadius={10} required/>

            <Button type="submit" sx={{borderRadius:3,marginTop:3}} variant="contained" color="warning">UPDATE</Button>
        </Box>
     </form>
    </>
  )
}

export default Blogdetails
