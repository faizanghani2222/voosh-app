import { Box, Button, Heading, Image } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

function Navbar(props) {

    const {data,setData,token,setToken}=useContext(AppContext)

    const handleLogout=()=>{
        setData({})
        setToken("")
        localStorage.removeItem("vooshToken")
    }

    return (
        <Box width={"100%"} background="transparent" px="5%" height="70px" display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Link to="/"><Image w="150px" src="https://voosh.in/static/media/VooshLogo.c64bcebd40a2d49cc591.webp" alt="error"/></Link>
        {
            token!==""?<Button variant={"outline"} onClick={handleLogout}>Logout</Button>:
            <Box w={{base:"40%",md:"25%",lg:"20%"}} display={"flex"} justifyContent="space-between" alignItems={"center"}>
                <Link to="/login"><Heading fontSize="24px" fontWeight="600">Login</Heading></Link>
                <Link to="/signup"><Heading fontSize="24px" fontWeight="600">Signup</Heading></Link>
            </Box>
        }
        
    </Box>
    );
}

export default Navbar;