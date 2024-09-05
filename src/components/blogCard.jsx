import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import {useState} from "react"
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Blogcard({id,isUser,key,title,description,image,user,time}) {
  const navigate=useNavigate();
  const handleEdit=()=>{
    navigate(`/blog-details/${id}`);
  }
  
  //functions of modal
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete=async ()=>{
    try{
      const {data}=await axios.delete(`https://blogapp-backend-39lz.onrender.com/blog/deleteblog/${id}`);
      if(data?.success)
      {
        closeModal();
        alert("The blog has been deleted!!");
        navigate("/myblogs");
      }
    }catch(err)
    {
      console.log(err);
    }
  }


  return (
    <Card sx={{ width: "60%",margin:"auto",mt:2,padding:2,boxShadow:'5px 5px 10px #ccc',":hover:":{
        boxShadow:"10px 10px 20px #ccc"
    } }}>
      {
        isUser && (
          <Box display="flex">
            <IconButton sx={{marginLeft:"auto"}} onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={openModal}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}


        {
          modalIsOpen &&

          (<Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Are you sure,you want to delete this blog?</h2>
          <IconButton  onClick={handleDelete} sx={{boxShadow:'1px 1px 2px #ccc',backgroundColor:"red",color:"white",padding:"10px",marginRight:"4px"}}> Yes </IconButton>
          <IconButton  onClick={closeModal} sx={{boxShadow:'1px 1px 2px #ccc',backgroundColor:"blue",color:"white",padding:"10px",marginLeft:"4px"}}> No </IconButton>
        </Modal>)
        }


      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user}
        subheader={time}
      />
     
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="h6" color="text.secondary">
          Title:  {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}