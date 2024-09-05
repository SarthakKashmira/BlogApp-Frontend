import {useState} from "react"
import {Box,AppBar,Toolbar,Button,Typography, Tabs, Tab} from "@mui/material";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import {useNavigate} from "react-router-dom";
const Header = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [value,setvalue]=useState();
    const isLogin=useSelector(state=>state.isLogin);
    const handleLogout=()=>{
      alert("Logout successfull")
      dispatch(authActions.logout());
      navigate('/login');
    }
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
            <Typography variant='h4'>
                IIIT BLOG APP
            </Typography>
            {isLogin && 
            (<Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
                <Tabs textColor="inherit" value={value} onChange={(e,val)=>setvalue(val)}>
                    <Tab label="Blogs" LinkComponent={Link} to="/blogs"/>
                    <Tab label="My Blogs" LinkComponent={Link} to="/myblogs"/>
                    <Tab label="Create Blog" LinkComponent={Link} to="/createblog"/>
                </Tabs>
            </Box>)
            }
            <Box display={'flex'} marginLeft='auto'>
                { !isLogin && 
                  (<><Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/login">Login</Button>
                     <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/register">Register</Button>
                   </>)
                }
                {isLogin && (<Button sx={{margin:1,color:'white'}} LinkComponent={Link} to="/login" onClick={handleLogout}>LogOut</Button>)}
                
            </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
