import React from "react";
import { Box } from "@chakra-ui/react";
import AllRoutes from "./AllRoutes/AllRoutes";
import Navbar from "./Components/Navbar";


function App() {
  return (
   <Box width="100%"  minHeight="100vh" bgImage="url('https://voosh.in/static/media/landing_bg.da8497cd24d321282c0d.webp')" backgroundPosition="center" bgSize="cover" bgRepeat="no-repeat">
   <Navbar/>
   <AllRoutes/>
   </Box>
  );
}

export default App;
