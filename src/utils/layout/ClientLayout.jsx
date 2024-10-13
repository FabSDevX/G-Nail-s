import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "../../component/ClientFooter";
import { ClientNavBar } from "../../component/ClientNavBar";
import Box from '@mui/material/Box';
import { getDocumentById } from "../firebaseDB";
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ClientLayout = () => {

  const [phoneNumberInfo, setphoneNumberInfo] = useState({
    phone: ''
  });

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };


  const handleWhatsAppClick = () => {

    const message = "Hola! Me gustaría obtener información sobre los cursos disponibles.";
    const encodedMessage = encodeURIComponent(message); 

    const phoneNumber = phoneNumberInfo.phone;

    // Redirige según el dispositivo
    if (isMobileDevice()) {
      // Dispositivo móvil
      window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    } else {
      // Escritorio o laptop
      window.location.href = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    }
  };

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
        minHeight: "100vh" 
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
        onClick={handleWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#25D366", 
          color: "white",
          width: "56px",
          height: "56px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          '&:hover': {
            backgroundColor: "#128C7E", 
          },
          zIndex: 1000,
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </IconButton>

    </Box>
  );
};

export default ClientLayout;