import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavBar } from "../../component/AdminNavBar";
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AdminNavBar />
      <Box sx={{ paddingTop: isMobile ? "56px" : "64px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;
