import instagram from "../../../assets/instagram.svg";
import whatsapp from "../../../assets/whatsapp.svg";
import facebook from "../../../assets/facebook.svg";
import { Box, Typography } from "@mui/material";
import { MapContainer } from "./MapContainer";
import { getDocumentById } from "../../../utils/firebaseDB";
import { ContactForm } from "./ContactForm";

const contactInfoTitleStyles = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "24px",
  lineHeight: "120%",
  letterSpacing: "-0.02em",
  paddingTop: "15px",
};

const contactInfoSubTitleStyles = {
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "120%",
};

const subSectionStyles = {
  background: "white",
  margin: "15px",
  padding: "0 15px 15px 15px",
  borderRadius: "10px",
};

const contactInfo = await getDocumentById("Contact info", "Information");
export function ContactInformation() {
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

  const whatsappPhone = `https://wa.me/${phone}`;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },

          padding: {
            xs: "20px",
            sm: "40px",
          },
        }}
      >
        <Box
          className="left-container"
          sx={{
            backgroundImage: "url(/contact-background2.webp)",
            backgroundRepeat: "round",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            width: {
              sm: "80vw",
              md: "600px",
            },
          }}
        >
          <Box className="header-contact-container" sx={subSectionStyles}>
            <Box
              sx={{ borderBottom: "black solid 1px" }}
              className="contact-personal"
            >
              <Typography style={contactInfoTitleStyles}>Contacto</Typography>
              <Box
                sx={{
                  padding: "15px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Typography style={{ ...contactInfoSubTitleStyles }}>
                    Teléfono:
                  </Typography>
                  <Box
                    component="a"
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                    href={whatsappPhone}
                  >
                    <Typography sx={{ fontWeight: "500", fontStyle: "normal" }}>
                      {phone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Typography style={contactInfoSubTitleStyles}>
                    Correo:
                  </Typography>
                  <Box
                    component="a"
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                    href={`mailto:${mail}`}
                  >
                    <Typography>{mail}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ borderBottom: "black solid 1px" }}
              className="contact-location"
            >
              <Typography sx={contactInfoTitleStyles}>Ubicación</Typography>
              <Typography sx={{ padding: "15px 0", width: "60%" }}>
                {location}
              </Typography>
            </Box>
            <Box
              sx={{ borderBottom: "black solid 1px", paddingBottom: "15px" }}
              className="contact-social-media"
            >
              <Typography
                sx={{
                  ...contactInfoTitleStyles,
                  textAlign: "center",
                  paddingBottom: "15px",
                }}
              >
                Redes Sociales
              </Typography>
              <Box
                style={{
                  display: "grid",
                  gridTemplateColumns: "33% 33% 33%",
                  justifyItems: "center",
                }}
              >
                <Box
                  component="a"
                  href={socialMedia["facebook"]}
                  sx={{
                    transition: "transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <img src={facebook} alt="Facebook icon" />
                </Box>
                <Box
                  component="a"
                  href={whatsappPhone}
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <img src={whatsapp} alt="Whatsapp icon" />
                </Box>
                <Box
                  component="a"
                  href={socialMedia["instagram"]}
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <img src={instagram} alt="Instagram icon" />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className="footer-contact-container"
            sx={{
              ...subSectionStyles,

              display: {
                xs: "grid",
                sm: "grid",
                md: "flex",
              },
              justifyContent: "center",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "",
              },

              gridTemplateRows: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "",
              },
              gap: {
                xs: "8px",
                sm: "8px",
                md: "30px",
              },
              width: {
                xs: "50vw",
                sm: "auto",
              },
              justifyItems: {
                xs: "center",
                sm: "center",
              },
              margin: {
                xs: "0 auto",
                sm: "15px",
              },
            }}
          >
            <Box className="contact-schedule">
              <Typography
                sx={{
                  ...contactInfoTitleStyles,
                  margin: "15px 0 0 0",
                  fontSize: {
                    xs: "16px",
                    md: "18px",
                    lg: "24px",
                  },
                }}
              >
                Horario de consultas
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                {Object.entries(schedule).map(([day, value]) => (
                  <Box
                    sx={{
                      margin: "0",
                    }}
                    key={day}
                  >
                    <Typography
                      sx={{
                        ...contactInfoSubTitleStyles,
                        textWrap: "nowrap",
                        fontSize: {
                          md: "16px",
                          lg: "20px",
                        },
                        display: {
                          xs: "flex",
                          sm: "unset",
                        },
                        gap: {
                          xs: "8px",
                          sm: "unset",
                        },
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                      }}
                    >
                      {day}{" "}
                      <span
                        style={{
                          textWrap: "wrap",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {value}
                      </span>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="contact-lessons-schedule">
              <Typography
                sx={{
                  ...contactInfoTitleStyles,
                  margin: "15px 0 0 0",
                  fontSize: {
                    xs: "16px",
                    md: "18px",
                    lg: "24px",
                  },
                }}
              >
                Horario de lecciones
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "16px",
                  gap: "10px",
                  alignItems: "center",
                  color: "var(--secondary-color)",
                }}
              >
                <Typography
                  sx={{
                    ...contactInfoSubTitleStyles,
                    fontSize: {
                      md: "16px",
                      lg: "18px",
                    },
                  }}
                >
                  {lessonSchedule[0]}
                </Typography>
                <Typography
                  sx={{
                    ...contactInfoSubTitleStyles,
                    fontSize: {
                      md: "16px",
                      lg: "18px",
                    },
                  }}
                >
                  {lessonSchedule[1]}
                </Typography>
                <Typography
                  sx={{
                    ...contactInfoSubTitleStyles,
                    fontSize: {
                      md: "16px",
                      lg: "18px",
                    },
                  }}
                >
                  {lessonSchedule[2]}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          className="right-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #000000",

            width: {
              xs: "80vw",
              sm: "560px",
            },
            height: {
              xs: "400px",
              sm: "auto",
            },
          }}
        >
          <MapContainer locationLink={locationLink} iFrame={iFrame} />
        </Box>
      </Box>
      <ContactForm email={mail} />
    </Box>
  );
}
