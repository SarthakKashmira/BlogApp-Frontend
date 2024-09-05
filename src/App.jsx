import Header from "./components/header"
import {Routes,Route} from "react-router-dom"
import Blogs from "./pages/blogs"
import Login from "./pages/login"
import Register from "./pages/register"
import Myblogs from "./pages/myblogs"
import Createblog from "./pages/createblog"
import Blogdetails from "./pages/blogdetails"
function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/myblogs" element={<Myblogs/>}/>
      <Route path="/blog-details/:id" element={<Blogdetails/>}/>
      <Route path="/" element={<Blogs/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/createblog" element={<Createblog/>} />
    </Routes>
    </>
  )
}

export default App
