import { Box, Button, Heading, Input, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import axios from 'axios';


function Dashboard() {

    const {data,setData,token}=useContext(AppContext)
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [order,setOrder]=useState({})

    const handleChange=(e)=>{
        let {name,value}=e.target
        setOrder({
            ...order,
            [name]:value
        })
       }

    const handleAdd=()=>{
        if(order.sub_total && order.title){
            let d=order
            d.phone_number=data.phone_number;
            d.token=token
            d.user_id=data._id
            axios.post("https://voosh-backend-8529.onrender.com/add-order",d).then((res)=>{
                setData({
                    ...data,
                    orders:res.data.orders
                })
                onClose()
                setOrder({})
            }).catch((e)=>{
                alert("Request failed try again")
                onClose()
                setOrder({})
            })
        }else{
            alert("Enter complete order details")
            onClose()
            setOrder({})
        }
    }

    useEffect(()=>{
        if(!token){
           navigate("/login")
        }
    },[token])



    return (
        <Box>
            <Box width="70%" m="auto" display="flex" justifyContent="space-between" pt="5vh"  alignItems="center">
            <Heading fontWeight="500" fontSize="28px">Your Orders</Heading>
            <Button onClick={onOpen} colorScheme="green">Add Order</Button>
            </Box>
            <Box width="70%" m="auto" mt="20px" boxShadow= "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px">
                {data.orders && data.orders.map((el)=>{
                    return <Box width="100%" display="flex" borderBottom="1px solid rgba(14, 30, 37, 0.12)" justifyContent="space-around" p="20px"  alignItems="center">
                                <Heading fontWeight="400" fontSize="24px">{el.title}</Heading>
                                <Heading fontWeight="400" fontSize="24px">Sub Total- {el.sub_total}</Heading>
                        </Box>
                })}
            </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Add Task</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input name="title" onChange={(e)=>handleChange(e)} type="text" placeholder='Enter Order Title'/>
                                <Input name="sub_total" onChange={(e)=>handleChange(e)} type="text" placeholder='Enter Order Sub-Total'/>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleAdd}>
                                Add
                                </Button>
                                <Button  onClick={onClose} variant='ghost'>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                </Modal>
        </Box>
    );
}

export default Dashboard;