import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"
import axios from "axios"
const Createblog = () => {
    const userId=localStorage.getItem('userId');
    const [inputs,setInputs]=useState({
        title:"",
        description:"",
        image:"",
        user:userId
    })
    const isLogin=useSelector(state=>state.isLogin);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isLogin){
          navigate('/login');
        }    
      },[])

      const handleChange=(e)=>{
        setInputs(prevState=>({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }
      const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post("https://blogapp-backend-39lz.onrender.com/blog/createblog",{title:inputs.title,description:inputs.description,image:inputs.image,user:inputs.user});
            console.log(data);
            if(data?.success)
            {
                alert("Blog created successfully!!");
                navigate('/myblogs')
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
            <Typography variant="h2" textAlign="center" fontWeight={'bold'} padding={3} color="gray">CREATE A BLOG</Typography>
            <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:"bold"}}>Title</InputLabel>
            <TextField value={inputs.title} margin="normal" placeholder="Title" name="title" onChange={handleChange} variant="outlined" borderRadius={10} required/>

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:"bold"}}>Description</InputLabel>
            <TextField value={inputs.description} margin="normal" placeholder="Description" name="description" onChange={handleChange} variant="outlined" borderRadius={10} required />

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px', fontWeight:"bold"}}>Image</InputLabel>
            <TextField value={inputs.image} margin="normal" placeholder="Image" name="image" onChange={handleChange} variant="outlined" borderRadius={10} required/>

            <Button type="submit" sx={{borderRadius:3,marginTop:3}} variant="contained" color="primary">CREATE</Button>
        </Box>
     </form>
     </>
  )
}

export default Createblog
