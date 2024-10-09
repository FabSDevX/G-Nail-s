import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "../../component/ClientFooter";
import { ClientNavBar } from "../../component/ClientNavBar";
import Box from '@mui/material/Box';
import { getDocumentById } from "../firebaseDB";
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Ícono de WhatsApp

const ClientLayout = () => {

  const [phoneNumberInfo, setphoneNumberInfo] = useState({
    phone: ''
  });

    // Cargar los datos de Firestore
  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await getDocumentById('Contact info', 'Information');
      if (data) {
        setphoneNumberInfo({
          phone: data.phone || 'Teléfono no disponible',     
         });
         console.log(data.phone)
      }   
     };
     fetchContactInfo();
  }, []);


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

      {/* Botón de WhatsApp */}
      <IconButton
        component="a"
        href={`https://wa.me/${phoneNumberInfo.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#25D366", // Color de WhatsApp
          color: "white",
          width: "56px",
          height: "56px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          '&:hover': {
            backgroundColor: "#128C7E", // Color más oscuro en hover
          },
          zIndex: 1000, // Asegurarse de que esté por encima de otros elementos
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </IconButton>

    </Box>
  );
};

export default ClientLayout;