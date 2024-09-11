import React from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "../../component/ClientFooter";
import { ClientNavBar } from "../../component/ClientNavBar";
import Box from '@mui/material/Box';

const ClientLayout = () => {
  return (
    <>
     <ClientNavBar />
      <Box sx={{ paddingTop: "110px", paddingBottom: "110px"}}>
        <Outlet />
      </Box>
      <ClientFooter />
    </>
  );
};

export default ClientLayout;