import { Box, Typography } from "@mui/material";
import { ContactInformation } from "./components/ContactInformation";
import { getDocumentById } from "../../utils/firebaseDB";
import { ContactForm } from "./components/ContactForm";
import { useEffect, useState } from "react";

export function Contact() {

  const [contactInfo, setContactInfo] = useState({
    location: '',
    phone: '',
    mail: '',
    facebook: '',
    instagram: '',
    iFrame: '',
    schedule: '',
    lessonSchedule: '',
    locationLink: '',
    socialMedia: ''
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await getDocumentById('Contact info', 'Information');
      if (data) {
        setContactInfo({
          location: data.location || 'Ubicación no disponible',
          phone: data.phone || 'Teléfono no disponible',
          mail: data.mail || 'Correo no disponible',
          iFrame: data.iFrame || 'Mapa no disponible',
          schedule: data.schedule || 'Horario no disponible',
          lessonSchedule: data.lessonSchedule || 'Horario de lecciones no disponible',
          locationLink: data.locationLink || 'https://maps.google.com',      
          socialMedia: {
            facebook: data.socialMedia?.facebook || 'https://facebook.com',
            instagram: data.socialMedia?.instagram || 'https://instagram.com',
          },
        });
      }
    };
    fetchContactInfo();
  }, []);
  
  return (
    <Box id="contact">
      <Box
        className="contact-header"
        sx={{
          backgroundImage: "url(/contact-background.webp)",
          backgroundRepeat: "repeat",
          height: "225px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: {
            md: "auto",
            lg: "cover",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "cursive",
            fontWeight: "bold",
            fontStyle: "italic",
            backgroundImage:
              "linear-gradient(180deg, rgba(251, 133, 185, 1) 0%, rgba(240, 88, 156, 1) 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            fontSize: {
              xs: "3em",
              sm: "4em",
              md: "5em",
              lg: "5em",
              xl: "5em",
            },
          }}
        >
          Contacta con nosotros
        </Typography>
      </Box>

      <Box className="contact-container">
        <ContactInformation
          location={contactInfo.location}
          iFrame={contactInfo.iFrame}
          mail={contactInfo.mail}
          phone={contactInfo.phone}
          schedule={contactInfo.schedule}
          lessonSchedule={contactInfo.lessonSchedule}
          locationLink={contactInfo.locationLink}
          socialMedia={contactInfo.socialMedia}
        />
      </Box>
      <Box>
        <ContactForm email={contactInfo.mail} />
      </Box>
    </Box>
  );
}
