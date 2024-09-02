import React from "react";
import { Outlet } from "react-router-dom";
import { ClientNavBar } from "../../component/ClientNavBar";
import Box from '@mui/material/Box';

const ClientLayout = () => {
  return (
    <>
      <ClientNavBar />
      <Box sx={{ paddingTop: "100px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default ClientLayout;