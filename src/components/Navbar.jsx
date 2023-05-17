import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { SearchBar } from "./";
import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = () => (
  <Stack direction="row" alignItems="center"  sx={{ position:  "sticky", background: 'rgb(46,46,46)', top: 0, justifyContent: "space-between" ,zIndex:"1"}}>
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <YouTubeIcon style={{fontSize:"45px",color:"red",marginLeft:"20px"}}></YouTubeIcon> 
      <p style={{color:"white",fontWeight:"bold",fontSize:"20px",fontFamily:"fantasy",marginLeft:"7px"}}><span>YouTube</span><sup style={{fontWeight:"normal"}}>EG</sup> </p>
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
