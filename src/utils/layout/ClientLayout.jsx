import React from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "../../component/ClientFooter";
import Box from '@mui/material/Box';

const ClientLayout = () => {
  return (
    <>

      <Box sx={{ paddingTop: "100px" }}>
        <Outlet />
      </Box>
      <ClientFooter />
    </>
  );
};

export default ClientLayout;