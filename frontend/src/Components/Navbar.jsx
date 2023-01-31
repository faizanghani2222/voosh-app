import { Box, Button, Heading, Image } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

function Navbar(props) {

    const {data,setData}=useContext(AppContext)

    const handleLogout=()=>{
        setData({})
        localStorage.removeItem("flameCloudToken")
    }

    return (
        <Box width={"100%"} background="transparent" px="5%" height="70px" display={"flex"} justifyContent="space-between" alignItems={"center"}>
        <Image w="150px" src="https://voosh.in/static/media/VooshLogo.c64bcebd40a2d49cc591.webp" alt="error"/>
        
        <Button variant={"outline"} onClick={handleLogout}>Logout</Button>
    </Box>
    );
}

export default Navbar;