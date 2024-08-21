import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavBar } from "../../component/AdminNavBar";
import Box from '@mui/material/Box';

const AdminLayout = () => {
  return (
    <>
      <AdminNavBar />
      <Box sx={{ paddingTop: "64px" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default AdminLayout;