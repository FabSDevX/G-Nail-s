import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from "@mui/material";

const ClientFooter = () => {

    const footerFlexDisplay = useMediaQuery('(max-width:740px)');

  return (
    <Box 
      sx={{ 
        backgroundColor: "#F1D9DD", 
        padding: "20px", 
        display: "flex", 
        flexDirection: footerFlexDisplay ? 'column' : 'row', // Column on small screens, row on larger screens
        justifyContent: {xs: "center", sm: 'space-between'}, 
        alignItems: "center",
        textAlign: "center", // Center text in smaller screens
        gap: "15px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src="/LOGO_GNAILS.png" alt="Logo" style={{ height: "100px", width:"100px", marginRight: "20px" }} />
        <Typography variant="body1" color="textSecondary">
          © 2024 Your Company Name
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <Button component={Link} to="/contacto" sx={{ color: "#000" }}>
          Contact
        </Button>
        <Button component={Link} to="/about" sx={{ color: "#000" }}>
          About Us
        </Button>
        <Button component={Link} to="/developers" sx={{ color: "#000" }}>
          Developers
        </Button>
      </Box>
    </Box>
  );
};

export default ClientFooter;