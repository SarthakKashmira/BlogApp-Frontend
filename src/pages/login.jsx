import {Box,Typography,TextField,Button} from "@mui/material"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../redux/store";
const Login = () => {
  const isLogin=useSelector(state=>state.isLogin);
  const navigate=useNavigate();
  useEffect(() => {
    if(isLogin)
    {
      navigate('/blogs')
    }
  }, [])
  
  const [err,setErr]=useState("");
  const [errflag,setErrFlag]=useState(false);
  
  const dispatch=useDispatch();
  const [inputs,setInputs]=useState({
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
      const data=await axios.post("https://blogapp-backend-39lz.onrender.com/user/login",{ email:inputs.email, password:inputs.password});
      if(data.data.message)
      {
        setErr(data.data.message);
        setErrFlag(true);
      }
      console.log(data.data.user[0]._id);
      if(data.data.success)
      { 
        localStorage.setItem("userId",data.data?.user[0]._id);
        alert("User login successfull"); 
        dispatch(authActions.login());
        navigate("/");}
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
      <Typography variant="h4" padding={3} textAlign="center" sx={{textTransform:"uppercase"}}>Login Page</Typography>
      <TextField placeholder="Email" name="email" 
      margin="normal" type={"email"} value={inputs.email} onChange={handleChange} required/>
      <TextField placeholder="password" name="password" 
      margin="normal" type={"password"} value={inputs.password} onChange={handleChange} required/>
      <Button type="submit" sx={{borderRadius:3,marginTop:3}}
      variant="contained" color="primary">Login</Button>
      {errflag &&
      <Typography variant="subtitle1" padding={3} textAlign="center" sx={{textTransform:"uppercase"}} color={'red'}>{err}</Typography>
      }
      <Button  onClick={()=>navigate('/register')} type="submit" sx={{borderRadius:3,marginTop:3}}
        color="primary">Not a user ? Please Register!!</Button>
    </Box>
    </form>

  )
}

export default Login
