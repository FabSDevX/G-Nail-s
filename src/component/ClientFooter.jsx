import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useMediaQuery } from "@mui/material";
import { getDocumentById } from "../utils/firebaseDB";

const ClientFooter = () => {

  const isMobile = useMediaQuery('(max-width:740px)');

  const [contactInfo, setContactInfo] = useState({
    location: '',
    phone: '',
    mail: '',
    facebook: '',
    instagram: ''
  });

  // Cargar los datos de Firestore
  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await getDocumentById('Contact info', 'Information');
      if (data) {
        setContactInfo({
          location: data.location || 'Ubicación no disponible',
          phone: data.phone || 'Teléfono no disponible',
          mail: data.mail || 'Correo no disponible',
          facebook: data.socialMedia.facebook || 'https://facebook.com',
          instagram: data.socialMedia.instagram || 'https://instagram.com'          
        });
      }
    };
    fetchContactInfo();
  }, []);

  return (
    <Box 
      sx={{ 
        backgroundColor: "#F1D9DD", 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        gap: "20px"
      }}
    >
      {/* Columns Container */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: "space-between", 
          width: "100%", 
          maxWidth: "1250px", // Optional max width to limit column stretch
          alignItems: "center",
        }}
      >
        {/* Contact Section */}
        <Box sx={{ flex: 1, textAlign: 'center', maxWidth: '380px'}}>
          <Typography 
            component={Link} 
            to="/contacto" 
            variant="h6" 
            sx={{ textDecoration: "none", color: "black", fontWeight: 'bold',  }}
          >
            Contacto
          </Typography>
          <Typography variant="body2" color="textSecondary" justifyContent="center">
            {contactInfo.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px'}}>
            Tel: {contactInfo.phone}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {contactInfo.mail}
          </Typography>

        </Box>

        {/* Logo Section */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img 
            src="/LOGO_GNAILS_rezi.png" 
            alt="Logo" 
            style={{ height: "100px", width: "170px" }} 
          />
        </Box>

        {/* About Section */}
        <Box sx={{ flex: 1, textAlign: 'center', maxWidth:'380px'}}>
          <Typography 
            component={Link} 
            to="/about" 
            variant="h6" 
            sx={{ textDecoration: "none", color: "black", fontWeight: 'bold' }}
          >
            Acerca de
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Academia profesional de belleza
          </Typography>
          <Typography variant="body2" color="textSecondary"  sx={{ marginBottom: '8px'}}>
            Uñas postizas, acrílicas, de gel y otros
          </Typography>
          <Typography variant="body2" color="textSecondary">
          Horarios Disponibles: 9am - 12pm, 1pm - 4pm, 6:30pm - 9:30pm.
          </Typography>
        </Box>
      </Box>

      {/* Social Media Icons */}
      <Box 
        sx={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "center", 
          gap: "15px", 
          marginTop: "20px"
        }}
      >
        <IconButton href={contactInfo.facebook} target="_blank" aria-label="Facebook">
          <Facebook sx={{ color: "#3b5998" }} />
        </IconButton>
        <IconButton href={contactInfo.instagram} target="_blank" aria-label="Instagram">
          <Instagram sx={{ color: "#E1306C" }}/>
        </IconButton>
        <IconButton href={`https://wa.me/${contactInfo.phone}`} target="_blank" aria-label="WhatsApp">
          <WhatsApp sx={{ color: "#25D366" }}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ClientFooter;