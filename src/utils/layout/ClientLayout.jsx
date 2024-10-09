import React from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "../../component/ClientFooter";
import { ClientNavBar } from "../../component/ClientNavBar";
import Box from '@mui/material/Box';

const ClientLayout = () => {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh" // Hace que ocupe el 100% de la altura de la ventana
      }}
    >
      <ClientNavBar />
      <Box 
        sx={{ 
          flex: "1", 
          paddingTop: "100px", 
          paddingBottom: "110px"
        }}
      >
        <Outlet />
      </Box>
      <ClientFooter />
    </Box>
  );
};

export default ClientLayout;