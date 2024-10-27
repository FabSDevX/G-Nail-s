import { Box, Button, Typography } from "@mui/material";
import contactUsHomepage from "../../assets/contactUsHomepage.webp";
import { useNavigate } from "react-router-dom";
function ContactUsHomepage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {xs: "column", sm:"column", md:"column", lg:"row-reverse"},
        alignItems: {md:"center"},
        justifyContent: {md:"start",lg:"center"},
        maxWidth: "1444px",
        marginTop: "100px",
      }}
    >
      <Box
        component="img"
        sx={{
          width: { sm: "100%", md:"650px", lg: "500px" },
          height: { md: "auto", lg: "auto" },
          margin: { sm: "auto", lg: "0 0 0 15px" },
        }}
        src={contactUsHomepage}
      ></Box>
      <Box
        sx={{
          border: "4px solid var(--primary-color)",
          display: "flex",
          flexDirection: "column",
          padding: {xs:"15px", sm:"40px", md: "25px", lg:"25px"},
          backgroundColor: "white",
          width: { sm: "auto", md: "600px" },
          height: { sm: "auto", md: "auto", lg:"auto" },
          position: { sm: "-moz-initial"},
        }}
      >
        <Box sx={{ margin: "0 auto" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: {xs:"25px",sm:"30px"},
              fontFamily: "Warung_Kopi",
              margin: "5px auto",
            }}
          >
            Contáctanos
          </Typography>
          <Box
            sx={{
              width: "50px",
              height: "3px",
              backgroundColor: "var(--primary-color)",
              margin: "10px auto",
            }}
          ></Box>
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontFamily: "Warung_Kopi",
          }}
        >
          En G´nails, estamos aquí para ayudarte a dar el siguiente paso en tu pasión por el arte de la belleza. 
          Si tienes preguntas sobre nuestras clases, talleres, o simplemente quieres saber más sobre cómo podemos 
          ayudarte a crecer en tu carrera, no dudes en contactarnos. Cada mensaje es una oportunidad para conocerte 
          mejor y brindarte el soporte personalizado que mereces. Nos encantaría escucharte y ser parte de tu camino 
          hacia la excelencia.
        </Typography>
        <Button
          sx={{
            mt: "15px",
            color: "var(--primary-color)",
            border: "2px solid var(--primary-color)",
            mx: "auto",
            px: "35px",
            py: "10px",
            my: "5px",
            maxWidth: "300px",
          }}
          onClick={() => navigate("/contacto")}
        >
          Contactenos
        </Button>
      </Box>
    </Box>
  );
}

export default ContactUsHomepage;
