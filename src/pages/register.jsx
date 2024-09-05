import {Box,Typography,TextField,Button} from "@mui/material"
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"
const Register = () => {
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    setInputs(prevState=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();   // to stop the pafge from refreshing
    try{
      const data=await axios.post("https://blogapp-backend-39lz.onrender.com/user/register",{username:inputs.name, email:inputs.email, password:inputs.password});
      if(data.data.success)
      {alert("User registered successfully"); navigate("/login");}
    }catch(err)
    {
      console.log(err);
    }
  }
  return (
  
    <form onSubmit={handleSubmit}>
    <Box maxWidth={450} 
     display="flex" flexDirection={'column'}
     alignItems="center" justifyContent={"center"} 
     margin="auto" marginTop={5} 
     boxShadow="10px 10px 20px #ccc" padding={3}
     borderRadius={5}>
      <Typography variant="h4" padding={3} textAlign="center" sx={{textTransform:"uppercase"}}>Register Here</Typography>
      <TextField placeholder="name" name="name" 
      margin="normal" type={"text"} value={inputs.name} onChange={handleChange} required/>
      <TextField placeholder="Email" name="email" 
      margin="normal" type={"email"} value={inputs.email} onChange={handleChange} required/>
      <TextField placeholder="password" name="password" 
      margin="normal" type={"password"} value={inputs.password} onChange={handleChange} required/>
      <Button type="submit" sx={{borderRadius:3,marginTop:3}}
      variant="contained" color="primary">Submit</Button>
      <Button  onClick={()=>navigate('/login')} type="submit" sx={{borderRadius:3,marginTop:3}}
        color="primary">Already Registerd ? Please Login!!</Button>
    </Box>
    </form>

  )
}

export default Register
