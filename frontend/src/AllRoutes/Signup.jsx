import { Box, Button, Heading, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup() {
     const navigate=useNavigate()
     const [loading,setLoading]=useState(false)
     const [signupData,setSignupData]=useState({})


     const handleChange=(e)=>{
        const {name,value}=e.target
        setSignupData({
            ...signupData,
            [name]:value
        })
     }



    const handleSignup=()=>{    
        setLoading(true)
        axios.post("https://voosh-backend-8529.onrender.com/add-user",signupData).then((res)=>{
            setLoading(false)
            navigate("/login")
        }).catch((err)=>{
            setLoading(false)
            alert("Signup Failed Try again")
        })
            
    }







    if(loading===true){

        return ( <Box w={"60%"} m="auto" mt="40vh" textAlign="center">
         <Spinner
             thickness='4px'
             speed='0.65s'
             emptyColor='gray.200'
             color='blue.500'
             size='xl'
             />
         </Box>)

    }else{

            return (
                <Box width="100%"  minHeight="100vh" display="flex" pt="15vh" justifyContent="center">
                    
                    <Box w={{base:"90%",md:"60%",lg:"40%"}} padding="20px" boxShadow= "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" borderRadius={"1.5em"} display="flex" flexDirection="column"  alignItems="center" paddingTop="5vh" height="60vh" gap="10vh">
                    
                        <Heading fontWeight="500" textAlign="center">Register</Heading>

                        <form onSubmit={handleSignup}>
                            <Input type="Number" mb="10px"  name="phone_number" onChange={(e)=>handleChange(e)} required={true} placeholder='Enter phone number' />
                            <Input type="String" mb="10px"  name="name" onChange={(e)=>handleChange(e)} required={true} placeholder='Enter your name' />
                            <Input type="String" mb="10px"  name="password" onChange={(e)=>handleChange(e)} required={true} placeholder='Enter new password' />
                            <Button w="100%" margin="auto" onClick={handleSignup} backgroundColor="#EF4D2D" color="white"  >Signup</Button>
                        </form>                
                    </Box>
                </Box>
            );

        }

    
}

export default Signup;