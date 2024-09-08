import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" gutterBottom>
        404 - Página No Encontrada
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Volver al Inicio
      </Button>
    </Box>
  );
};

export default NotFound;
