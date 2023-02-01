import { Box, Button, Heading, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

function Login() {
     const {data,setData,token,setToken}=useContext(AppContext)
     const navigate=useNavigate()
     const [loading,setLoading]=useState(false)
     const [loginData,setLoginData]=useState({})


     const handleChange=(e)=>{
        const {name,value}=e.target
        setLoginData({
            ...loginData,
            [name]:value
        })
     }



    const handleUser=()=>{    
        setLoading(true)
        axios.post("https://voosh-backend-8529.onrender.com/login-user",loginData).then((res)=>{
            localStorage.setItem("vooshToken",res.data.token)
            setToken(res.data.token)
            setLoading(false)
            setData(res.data.user)
            navigate("/")
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            alert("Login Failed Try again")
        })
            
    }


   const handlePageRefresh=(t)=>{
    let obj={token:t}
    setLoading(true)
        axios.post("https://voosh-backend-8529.onrender.com/login-user",obj).then((res)=>{
            setLoading(false)
            setData(res.data.user)
            setToken(res.data.token)
            navigate("/")
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            alert("Login Failed Try again")
        })
    }


    useEffect(()=>{
        if(!token){
            let t=localStorage.getItem("vooshToken")
            if(t){
                handlePageRefresh(t)
            }
        }
    },[])

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
                    
                    <Box w={{base:"90%",md:"60%",lg:"40%"}} boxShadow= "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px" borderRadius={"1.5em"} display="flex" flexDirection="column"  alignItems="center" paddingTop="5vh" height="50vh" gap="10vh">
                    
                        <Heading fontWeight="500" textAlign="center">Login</Heading>

                        <form onSubmit={handleUser}>
                            <Input type="Number" mb="10px"  name="phone_number" onChange={(e)=>handleChange(e)} required={true} placeholder='Enter phone number' />
                            <Input type="Password" mb="10px"  name="password" onChange={(e)=>handleChange(e)} required={true} placeholder='Enter your password' />
                            <Button w="100%" margin="auto" onClick={handleUser} backgroundColor="#EF4D2D" color="white" fontWeight="500px" >Login</Button>
                        </form>                
                    </Box>
                </Box>
            );

        }

    
}

export default Login;