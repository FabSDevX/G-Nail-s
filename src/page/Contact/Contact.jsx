import { Box, Typography } from "@mui/material";
import { ContactInformation } from "./components/ContactInformation";
import { getDocumentById } from "../../utils/firebaseDB";
import { ContactForm } from "./components/ContactForm";

const contactInfo = await getDocumentById("Contact info", "Information");

export function Contact() {
  const {
    location,
    iFrame,
    mail,
    phone,
    schedule,
    lessonSchedule,
    locationLink,
    socialMedia,
  } = contactInfo;
  return (
    <Box id="contact">
      <Box
        className="contact-header"
        sx={{
          backgroundImage: "url(/contact-background.webp)",
          backgroundRepeat: "repeat",
          height: "288px",
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
          location={location}
          iFrame={iFrame}
          mail={mail}
          phone={phone}
          schedule={schedule}
          lessonSchedule={lessonSchedule}
          locationLink={locationLink}
          socialMedia={socialMedia}
        />
      </Box>
      <Box>
        <ContactForm email={mail} />
      </Box>
    </Box>
  );
}
